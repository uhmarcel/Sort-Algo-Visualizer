import { AlgorithmRecorder } from './AlgorithmRecorder';
import { RecordableSort } from '../types';

export class InsertionSort extends AlgorithmRecorder implements RecordableSort {

    public name = "Insertion Sort";

    public sort(array: number[])  {
        this.startRecording(array);
        this.insertionSort(array);
        return this.dumpPlayback();
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