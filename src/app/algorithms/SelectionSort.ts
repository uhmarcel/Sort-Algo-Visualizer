import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class SelectionSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Selection Sort";

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.selectionSort(state);
        });
    }

    private selectionSort(array: number[]) {
        const size = array.length;
        for (let i = 0; i < size - 1; i++) {
            let minimum = i;
            for (let j = i + 1; j < size; j++) {
                this.recordComparison(j, minimum);
                if (array[j] < array[minimum]) {
                    minimum = j;
                }
            }
            this.swap(array, i, minimum);
        }
    }

    private swap(array: number[], left: number, right: number) {
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;
        this.recordChanges(array);
    }
    
}
/*
 void sort(int arr[]) 
    { 
        int n = arr.length; 
  
        // One by one move boundary of unsorted subarray 
        for (int i = 0; i < n-1; i++) 
        { 
            // Find the minimum element in unsorted array 
            int min_idx = i; 
            for (int j = i+1; j < n; j++) 
                if (arr[j] < arr[min_idx]) 
                    min_idx = j; 
  
            // Swap the found minimum element with the first 
            // element 
            int temp = arr[min_idx]; 
            arr[min_idx] = arr[i]; 
            arr[i] = temp; 
        } 
    } 
    */