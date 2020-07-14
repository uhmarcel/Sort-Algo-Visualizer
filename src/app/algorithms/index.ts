import { InsertionSort } from "./insertionSort";
import { QuickSort } from './quickSort';
import { MergeSort } from './MergeSort';
import { BubbleSort } from './BubbleSort';
import { SelectionSort } from './SelectionSort';
import { HeapSort } from './HeapSort';
import { ShellSort } from './ShellSort';
import { RadixSort } from './RadixSort';
import { CombSort } from './CombSort';
import { GnomeSort } from './GnomeSort';
import { BitonicSort } from './BitonicSort';
import { BogoSort } from './BogoSort';
import { LessBogoSort } from './LessBogoSort';
import { LeastBogoSort } from './LeastBogoSort';

export default [
    new BubbleSort,
    new GnomeSort,
    new SelectionSort,
    new InsertionSort,
    new CombSort,
    new ShellSort,
    new HeapSort,
    new MergeSort,
    new QuickSort,
    new RadixSort,
    new BitonicSort,
    new BogoSort,
    new LessBogoSort,
    new LeastBogoSort
];