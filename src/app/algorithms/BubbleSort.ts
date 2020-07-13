import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class BubbleSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Bubble Sort";
    public complexity = "O(n^2)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.bubbleSort(state);
        });
    }

    private bubbleSort(array: number[]) {
        const size = array.length;
        for (let i = 0; i < size - 1; i++) {
            for (let j = 0; j < size - i - 1; j++) {
                this.recordComparison(j, j + 1);
                if (array[j] > array[j + 1]) {
                    this.swap(array, j, j + 1);
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