import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  public sortingAlgorithm$ = new BehaviorSubject<SortingAlgorithm>(sortingAlgorithms[DEFAULT_ALGORITHM]);
  public playbackSpeed$ = new BehaviorSubject<number>(DEFAULT_PLAYBACK_SPEED);
  public numberArray$ = new BehaviorSubject<number[]>([]);

  constructor() {
    this.randomizeNumberArrayFirstTime();
  }

  setSortingAlgorithm(algorithm: SortingAlgorithm) {
    this.sortingAlgorithm$.next(algorithm);
  }

  setNumberArray(array: number[]) {
    this.numberArray$.next(array);
  }

  setPlaybackSpeed(interval: number) {
    this.playbackSpeed$.next(interval);
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
