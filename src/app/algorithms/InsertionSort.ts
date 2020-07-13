import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class InsertionSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Insertion Sort";
    public complexity = "O(n^2)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state) => {
            this.insertionSort(state);
        });
    }

    private insertionSort(array: number[]) {
        for (let i = 1; i < array.length; i++) {
            let j = i - 1;
            let temp = array[i];
    
            if (j >= 0) 
                this.recordComparison(j, i);
    
            while (j >= 0 && array[j] > temp) {
                array[j + 1] = array[j];
                this.recordChanges(array);
                j--;
                
                if (j >= 0) 
                    this.recordComparison(j, i);
            }
            array[j + 1] = temp;
            this.recordChanges(array);
        }
    }

}