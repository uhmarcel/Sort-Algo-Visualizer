import { SortValue, Changes } from '../types';
import { PLAYBACK_SIZE_LIMIT } from '../constants';

export class AlgorithmRecorder {

  private projection: SortValue[] = null;
  private playback: Changes[][] = null;
  constructor() {}

  public recordAlgorithm(initialState: number[], recordFunction: Function) {
    this.projection = initialState.map(element => ({
      value: element,
      compared: false
    })); 
    this.playback = [];

    try {
      recordFunction(initialState.slice());
    } catch(error) {
      console.warn(error.message);
    }
    return this.dumpPlayback();
  }

  public recordChanges(array: number[]): void {
    if (this.playback.length >= PLAYBACK_SIZE_LIMIT) {
      throw new Error('Execution exceeded maximum playback size');
    }

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

  public recordComparison(first: number, second: number = null): void {    
    if (second == null) second = first;
    const n = this.projection.length;
    if (first < 0 || first >= n || second < 0 || second >= n) {
      if (first !== -1 || second !== -1) {
        return;
      }
    }

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

  private dumpPlayback(): Changes[][] {
    this.recordComparison(-1, -1);
    return this.playback;
  }

}
