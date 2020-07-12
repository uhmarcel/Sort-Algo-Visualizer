import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortingAlgorithm } from './types';
import sortingAlgorithms from './algorithms';
import { 
  DEFAULT_ALGORITHM, 
  DEFAULT_PLAYBACK_SPEED, 
  ARRAY_MIN_SIZE, 
  ARRAY_MAX_SIZE,
  ARRAY_INIT_MIN_SIZE, 
  ARRAY_INIT_MAX_SIZE 
} from './constants';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  public sortingAlgorithm$: Observable<SortingAlgorithm>; 
  public playbackSpeed$: Observable<number>;
  public numberArray$: Observable<number[]>;
  public isColorized$: Observable<boolean>;

  private _sortingAlgorithm$ = new BehaviorSubject<SortingAlgorithm>(sortingAlgorithms[DEFAULT_ALGORITHM]);
  private _playbackSpeed$ = new BehaviorSubject<number>(DEFAULT_PLAYBACK_SPEED);
  private _numberArray$ = new BehaviorSubject<number[]>([]);
  private _isColorized$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.sortingAlgorithm$ = this._sortingAlgorithm$.asObservable();
    this.playbackSpeed$ = this._playbackSpeed$.asObservable();
    this.numberArray$ = this._numberArray$.asObservable();
    this.isColorized$ = this._isColorized$.asObservable();
    this.randomizeNumberArrayFirstTime();
  }

  setSortingAlgorithm(algorithm: SortingAlgorithm) {
    this._sortingAlgorithm$.next(algorithm);
  }

  setNumberArray(array: number[]) {
    this._numberArray$.next(array);
  }

  setPlaybackSpeed(interval: number) {
    this._playbackSpeed$.next(interval);
  }

  setIsColorized(colorized: boolean) {
    this._isColorized$.next(colorized);
  }

  randomizeNumberArray() {
    const totalBars = Math.floor(Math.random() * (ARRAY_MAX_SIZE - ARRAY_MIN_SIZE + 1)) + ARRAY_MIN_SIZE;
    this.randomizeNumberArrayWithSize(totalBars);
  }
  
  randomizeNumberArrayFirstTime() {
    const totalBars = Math.floor(Math.random() * (ARRAY_INIT_MAX_SIZE - ARRAY_INIT_MIN_SIZE + 1)) + ARRAY_INIT_MIN_SIZE;
    this.randomizeNumberArrayWithSize(totalBars);
  }

  randomizeNumberArrayWithSize(size: number) {
    const nextArray = Array.from({ length: size }, () => (Math.floor(Math.random() * 101)));
    this.setNumberArray(nextArray);
  }
}
