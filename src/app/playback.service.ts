import { Injectable } from '@angular/core';
import { SortValue, Changes } from './types';
import { ConfigService } from './config.service';
import { combineLatest } from 'rxjs';

const MIN_VALUES = 30;
const MAX_VALUES = 200;

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  public currentValues: SortValue[];
  public playback: Changes[][];
  public step = 0;

  constructor(
    private readonly configService: ConfigService
  ) {
    combineLatest(
      this.configService.numberArray$,
      this.configService.sortingAlgorithm$,
    ).subscribe(([nextArray, nextAlgorithm]) => {
      this.currentValues = nextArray.map( element => ({
        value: element,
        compared: false,
      }));

      this.playback = nextAlgorithm.sort(nextArray);
      this.step = 0;
    });
  }

  public next(): void {
    if (this.playback && this.step < this.playback.length) {
      this.playback[this.step].forEach(delta => {
        if (delta.value) {
          this.currentValues[delta.index].value += delta.value;
        }
        if (delta.compared !== null) {
          this.currentValues[delta.index].compared = delta.compared; 
        }
      });
      this.step++;
    }
  }

  public prev(): void {
    if (this.playback && this.step > 0) {
      this.playback[this.step - 1].forEach(delta => {
        if (delta.value) {
          this.currentValues[delta.index].value -= delta.value;
        }
        if (delta.compared !== null) {
          this.currentValues[delta.index].compared = !delta.compared;
        }
      });
      this.step--;
    }
  }

  public getNumberArray(): number[] {
    return this.currentValues.map(element => element.value);
  }

}
