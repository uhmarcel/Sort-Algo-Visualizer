import { Injectable } from '@angular/core';
import { SortValue, Changes } from './types';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private projection: SortValue[] = null;
  private playback: Changes[][] = null;
  constructor() {}

  public startRecording(initialState: number[]) {
    this.projection = initialState.map(element => ({
      value: element,
      compared: false
    })); 
    this.playback = [];
  }

  public recordChanges(array: number[]): void {
    let changes = [];
    array.forEach((element, index) => {
      if (element !== this.projection[index].value) {
        changes.push({ 
          index: index,
          value: element - this.projection[index].value,
          compared: null
        });
        this.projection[index].value = element;
      }
    });
    this.playback.push(changes);
  }

  public recordComparison(first: number, second: number): void {
    let changes = [];
    this.projection.forEach((element, index) => {
      if (index === first || index === second) {
        if (element.compared !== true) {
          changes.push({ index: index, value: null, compared: true });
          this.projection[index].compared = true;
        }
      } else {
        if (element.compared !== false) {
          changes.push({ index: index, value: null, compared: false });
          this.projection[index].compared = false;
        }
      }
    });
    this.playback.push(changes);
  }

  public dumpPlayback(): Changes[][] {
    this.recordComparison(-1, -1);
    return this.playback;
  }

}
