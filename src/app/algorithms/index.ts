import { InsertionSort } from "./insertionSort";
import { QuickSort } from './quickSort';
import { MergeSort } from './MergeSort';
import { BubbleSort } from './BubbleSort';
import { SelectionSort } from './SelectionSort';
import { HeapSort } from './HeapSort';
import { ShellSort } from './ShellSort';
import { RadixSort } from './RadixSort';

export default [
    new BubbleSort,
    new SelectionSort,
    new InsertionSort,
    new ShellSort,
    new HeapSort,
    new MergeSort,
    new QuickSort,
    new RadixSort,
];