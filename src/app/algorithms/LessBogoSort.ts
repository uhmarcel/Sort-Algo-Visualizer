import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class LessBogoSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Less Bogo Sort";
    public complexity = "O(n*n!)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.lessBogoSort(state);
        });
    }

    private lessBogoSort(array: number[]) {
        for (let i = 0; i < array.length; i++) {
            while (!this.isSorted(array, i)) {
                this.shuffle(array, i);
            }
        }
    }

    private isSorted(array: number[], index: number) {
        for (let i = index + 1; i < array.length; i++) {
            this.recordComparison(index, i);
            if (array[index] > array[i]) { 
                return false;
            }
        }
        return true;
    }

    private shuffle(array: number[], from: number) {
        const n = array.length;
        for (let i = from; i < n; i++) {
            const randomIndex = Math.floor(Math.random() * (n - from) + from);
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