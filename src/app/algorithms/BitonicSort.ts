import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class BitonicSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Bitonic Sort";
    public complexity = "O(n log^2n)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.bitonicSort(state, 0, state.length);
        });
    }

    private bitonicSort(array: number[], low: number, count: number, asc: boolean = true) {
        if (count <= 1) return;
        const k = Math.floor(count / 2);

        this.bitonicSort(array, low, k, !asc);
        this.bitonicSort(array, low + k, count - k, asc);
        this.bitonicMerge(array, low, count, asc);
    }

    private bitonicMerge(array: number[], low: number, count: number, asc: boolean) {
        if (count <= 1) return;
        const k = this.greatestPowerOfTwoLessThan(count);

        for (let i = low; i < low + count - k; i++) {
            this.recordComparison(i, i + k);
            if (asc == (array[i] > array[i + k])) {
                this.swap(array, i, i + k);
            }
        }

        this.bitonicMerge(array, low, k, asc);
        this.bitonicMerge(array, low + k, count - k, asc);
    }

    greatestPowerOfTwoLessThan(n: number) {
        let k = 1;
        while (k > 0 && k < n)
            k = k << 1;
        return k >>> 1;
    }

    private swap(array: number[], left: number, right: number) {
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;
        this.recordChanges(array);
    }
    
}
