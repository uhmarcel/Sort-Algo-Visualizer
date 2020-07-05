import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class RadixSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Radix Sort";

    private RADIX_BASE = 2;

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.radixsort(state, this.RADIX_BASE);
        });
    }

    private radixsort(array: number[], base: number) { 
        let max = this.findMaximum(array); 
  
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= base) {
            this.countSort(array, exp, base); 
        }
    } 
  
    private countSort(array: number[], exp: number, base: number) { 
        const size = array.length;
        let buckets = new Array<number>(size);
        let count = new Array<number>(base).fill(0);
  
        for (let i = 0; i < size; i++) {
            this.recordComparison(i, i);
            const index = Math.floor(array[i] / exp) % base; 
            count[index]++; 
        }
  
        for (let i = 1; i < base; i++) {
            count[i] += count[i - 1]; 
        }
  
        for (let i = size - 1; i >= 0; i--) { 
            this.recordComparison(i, i);
            const index = Math.floor(array[i] / exp) % base;
            buckets[count[index] - 1] = array[i]; 
            count[index]--; 
        } 
  
        for (let i = 0; i < size; i++) {
            array[i] = buckets[i]; 
            this.recordChanges(array);
        }
    } 
    
    private findMaximum(array: number[]) {
        let max = 0;
        for (let i = 1; i < array.length; i++) {
            if (array[i] > array[max]) {
                max = i;
            }
        }
        return array[max];
    }
}