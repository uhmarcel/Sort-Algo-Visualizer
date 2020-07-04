import { AlgorithmRecorder } from './AlgorithmRecorder';
import { RecordableSort } from '../types';

export class QuickSort extends AlgorithmRecorder implements RecordableSort {

    public name = "Quick Sort";

    public sort(array: number[]) { // TODO: make startRecording to return 
        this.startRecording(array);
        this.quickSort(array, 0, array.length - 1);
        return this.dumpPlayback();
    }

    private quickSort(array: number[], left: number, right: number) {
        if (array.length > 1) {
            let pivot = this.partition(array, left, right); 
    
            this.recordComparison(left, pivot - 1);
            if (left < pivot - 1) { 
                this.quickSort(array, left, pivot - 1);
            }
            this.recordComparison(pivot, right);
            if (pivot < right) { 
                this.quickSort(array, pivot, right);
            }
        }
        return array;
    }

    private swap(array: number[], left: number, right: number) {
        let temp = array[left];
        array[left] = array[left];
        array[right] = temp;
        this.recordChanges(array);
    }
  
    private partition(array: number[], left: number, right: number) {
        let pivot = array[right];
        let i = left - 1;  
 
        this.recordComparison(left, right - 1);
        for (let j = left; j <= right - 1; j++) {
            if (array[j] < pivot)
            {
                i++;  
                this.swap(array, i, j);
            }
            this.recordComparison(j, right - 1);
        }
        this.swap(array, i + 1, right);
        return (i + 1);
    }
    
}