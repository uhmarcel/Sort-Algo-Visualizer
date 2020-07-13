import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

const DEFAULT_SHRINK_FACTOR = 1.3;

export class CombSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Comb Sort";
    public complexity = "O(n^2)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.combSort(state);
        });
    }

    private combSort(array: number[], shrink: number = DEFAULT_SHRINK_FACTOR) {
        let gap = array.length;
        let sorted = false;

        while (!sorted) {
            gap = Math.floor(gap / shrink);
            if (gap <= 1) {
                gap = 1;
                sorted = true;
            } 

            for (let i = 0; i + gap < array.length; i++) {
                this.recordComparison(i, i + gap);
                if (array[i] > array[i + gap]) {
                    this.swap(array, i, i + gap);
                    sorted = false;
                }
            }
        }

    }

    private swap(array: number[], left: number, right: number) {
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;
        this.recordChanges(array);
    }
    
}