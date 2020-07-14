import { AlgorithmRecorder } from './AlgorithmRecorder';
import { SortingAlgorithm, Playback } from '../types';

export class LeastBogoSort extends AlgorithmRecorder implements SortingAlgorithm {

    public name = "Least Bogo Sort";
    public complexity = "O(n*n!)"; 

    public sort(array: number[]): Playback {
        return this.recordAlgorithm(array, (state: number[]) => {
            this.leastBogoSort(state);
        });
    }

    private leastBogoSort(array: number[]) {
        const size = array.length;
        const unsorted = array.reduce((acc, _, index) => {
            acc[index] = true; 
            return acc;
        }, {});

        for (let i = 0; i < size; i++) {
            while (unsorted[i] === true) {
                this.shuffle(array, unsorted);
            }
        }
    }

    private shuffle(array: number[], unsorted: object) {
        const remaining = Object.keys(unsorted);
        const size = array.length;
        
        for (let i = 0; i < remaining.length; i++) {
            const randomIndex = Math.floor(Math.random() * remaining.length);
            this.swap(array, parseInt(remaining[i]), parseInt(remaining[randomIndex]));
        }

        for (let i = 0; i < remaining.length; i++) {
            const current = parseInt(remaining[i]);
            let smallerItems = 0;
            let duplicates = 0;

            for (let j = 0; j < size; j++) {
                if (array[j] < array[current]) {
                    smallerItems++;
                } else if (array[j] === array[current]) {
                    duplicates++;
                }
            }

            if (current >= smallerItems && current < smallerItems + duplicates) {
                delete unsorted[current];
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