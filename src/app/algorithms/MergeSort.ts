import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class MergeSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Merge Sort";
    public complexity = "O(n logn)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.mergeSort(state, 0, state.length - 1);
        });
    }

    private mergeSort(array: number[], left: number, right: number) {
        this.recordComparison(left, right);
        if (left < right) {
            let middle = Math.floor(left + (right - left) / 2);
    
            this.mergeSort(array, left, middle);
            this.mergeSort(array, middle + 1, right);
            this.merge(array, left, middle, right);
        }
    }

    private merge(array: number[], left: number, middle: number, right: number) {
        let n1 = Math.floor(middle - left + 1);
        let n2 = Math.floor(right - middle);

        let leftArray = new Array<number>(n1);
        let rightArray = new Array<number>(n2);

        for (let i = 0; i < n1; i++) {
            leftArray[i] = array[left + i];
        }

        for (let j = 0; j < n2; j++) {
            rightArray[j] = array[middle + 1 + j];
        }

        let i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            this.recordComparison(left + i, middle + 1 + j);
            if (leftArray[i] <= rightArray[j]) {
                array[k] = leftArray[i];
                i++;
            } else {
                array[k] = rightArray[j];
                j++;
            }
            this.recordChanges(array);
            k++;
        }

        while (i < n1) {
            array[k] = leftArray[i];
            this.recordChanges(array);
            i++;
            k++;
        }

        while (j < n2) {
            array[k] = rightArray[j];
            this.recordChanges(array);
            j++;
            k++;
        }
    }
    
}