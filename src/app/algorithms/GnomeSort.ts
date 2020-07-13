
import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class GnomeSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Gnome Sort";
    public complexity = "O(n^2)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state) => {
            this.gnomeSort(state);
        });
    }

    private gnomeSort(array: number[]) {
        let index = 0;
        while (index < array.length) {
            if (index == 0) index++;

            this.recordComparison(index, index - 1);
            if (array[index] >= array[index - 1]) {
                index++;
            } else {
                this.swap(array, index, index - 1);
                index--;
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