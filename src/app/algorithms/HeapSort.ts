import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class HeapSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Heap Sort";
    public complexity = "O(n logn)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.heapSort(state);
        });
    }

    private heapSort(array: number[]) {
        const size = array.length;

        for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
            this.heapify(array, size, i);
        }

        for (let i = size - 1; i > 0; i--) {
            this.swap(array, 0, i);
            this.heapify(array, i, 0);
        }
    }

    private heapify(array: number[], size: number, index: number) {
        let max = index;
        let left = 2 * index + 1;
        let right = 2 * index + 2;
  
        this.recordComparison(left, max);
        if (left < size && array[left] > array[max]) {
            max = left; 
        }
  
        this.recordComparison(right, max);
        if (right < size && array[right] > array[max]) {
            max = right; 
        }
  
        if (max != index) { 
            this.swap(array, max, index);
            this.heapify(array, size, max); 
        } 
    }

    private swap(array: number[], left: number, right: number) {
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;
        this.recordChanges(array);
    }
    
}