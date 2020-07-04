import { Injectable } from '@angular/core';
import { SortValue, Playback } from './types';
import { ConfigService } from './config.service';
import { combineLatest, BehaviorSubject, Observable, interval, Subscription, Subject, merge } from 'rxjs';
import { map, switchMap, takeUntil, tap, finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  public values$: Observable<SortValue[]>;
  public isPlaying$: Observable<boolean>;

  private _playback: Playback;
  private _step = 0;

  private _interval$: Observable<number>;
  private _stopInterval$ = new Subject();
  private _values$ = new BehaviorSubject<SortValue[]>([]);
  private _isPlaying$ = new BehaviorSubject<boolean>(false);
  private _resetPlayback$ = new BehaviorSubject(undefined);

  constructor(
    private readonly configService: ConfigService
  ) {
    combineLatest(
      this.configService.numberArray$,
      this.configService.sortingAlgorithm$,
      this._resetPlayback$,
    )
    .subscribe(([nextArray, nextAlgorithm]) => {
      const initialValues = nextArray.map( element => ({
        value: element,
        compared: false,
      }));
      this._playback = nextAlgorithm.sort(nextArray);
      this._values$.next(initialValues);
      this._stopInterval$.next();
      this._step = 0;
    });

    this._interval$ = this.configService.playbackSpeed$.pipe(
      tap(() => this._isPlaying$.next(true)),
      switchMap(period => interval(period)),
      takeUntil(this._stopInterval$),
      tap(() => this.internalNext()),
      finalize(() => this._isPlaying$.next(false))
    );

    this.values$ = this._values$.asObservable();
    this.isPlaying$ = this._isPlaying$.asObservable();
  }

  public next(): void {
    this.pause();
    this.internalNext();
  }

  public prev(): void {
    this.pause();
    this.internalPrev();
  }

  public reset(): void {
    this.pause();
    this._resetPlayback$.next(undefined);
  }

  public start(): void {
    this._stopInterval$.next();
    if (this._step >= this._playback.length) {
      this.reset();
    }
    this._interval$.subscribe();
  }

  public pause(): void {
    this._stopInterval$.next();
  }

  private internalNext() {
    if (this._playback && this._step < this._playback.length) {
      const nextValues = this._values$.getValue();

      this._playback[this._step].forEach(delta => {
        if (delta.value) {
          nextValues[delta.index].value += delta.value;
        }
        if (delta.compared !== null) {
          nextValues[delta.index].compared = delta.compared; 
        }
      });
      this._step++;

      this._values$.next(nextValues);
    } else {
      this._stopInterval$.next();
    }
  }

  private internalPrev(): void {
    if (this._playback && this._step > 0) {
      const prevValues = this._values$.getValue();

      this._playback[this._step - 1].forEach(delta => {
        if (delta.value) {
          prevValues[delta.index].value -= delta.value;
        }
        if (delta.compared !== null) {
          prevValues[delta.index].compared = !delta.compared;
        }
      });
      this._step--;

      this._values$.next(prevValues);
    }
  }
}
