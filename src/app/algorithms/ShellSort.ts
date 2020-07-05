import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class ShellSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Shell Sort";

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.shellSort(state);
        });
    }

    private shellSort(array: number[]) {
        const size = array.length;

        for (let gap = Math.floor(size / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < size; i++) {
                let temp = array[i];
                let j: number;

                this.recordComparison(i, i - gap);
                for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                    array[j] = array[j - gap];
                    this.recordChanges(array);
                    this.recordComparison(i, j - gap);
                }
                array[j] = temp;
                this.recordChanges(array);
            }
        }    
    }
    
}