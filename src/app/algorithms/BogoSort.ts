import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class BogoSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Bogo Sort";
    public complexity = "O(n*n!)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.bogoSort(state);
        });
    }

    private bogoSort(array: number[]) {
        let step = 0;
        while (!this.isSorted(array)) {
            this.shuffle(array);
            step++;
        }
    }

    private isSorted(array: number[]) {
        for (let i = 1; i < array.length; i++) {
            this.recordComparison(i - 1, i);
            if (array[i - 1] > array[i]) { 
                return false;
            }
        }
        return true;
    }

    private shuffle(array: number[]) {
        const n = array.length;
        for (let i = 0; i < n; i++) {
            const randomIndex = Math.floor(Math.random() * n);
            this.swap(array, i, randomIndex);
        }
    }

    private swap(array: number[], left: number, right: number) {
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;
        this.recordChanges(array);
    }
    
}