import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class QuickSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Quick Sort";

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.quickSort(state, 0, state.length - 1);
        });
    }

    private quickSort(array: number[], left: number, right: number) {
        this.recordComparison(left, right);
        if (left < right) {
            let pivot = this.partition(array, left, right);
    
            this.quickSort(array, left, pivot - 1);
            this.quickSort(array, pivot + 1, right);
        }
    }

    private swap(array: number[], left: number, right: number) {
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;
        this.recordChanges(array);
    }
  
    private partition(array: number[], left: number, right: number) {
        let pivot = array[right];
        let i = left - 1;  
 
        for (let j = left; j <= right - 1; j++) {
            this.recordComparison(j, pivot);
            if (array[j] < pivot)
            {
                i++;  
                this.swap(array, i, j);
            }
        }
        this.swap(array, i + 1, right);
        return (i + 1);
    }
    
}