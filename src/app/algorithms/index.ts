import { InsertionSort } from "./insertionSort";
import { QuickSort } from './quickSort';
import { MergeSort } from './MergeSort';
import { BubbleSort } from './BubbleSort';
import { SelectionSort } from './SelectionSort';
import { HeapSort } from './HeapSort';

export default [
    new BubbleSort,
    new InsertionSort,
    new SelectionSort,
    new HeapSort,
    new MergeSort,
    new QuickSort,
];