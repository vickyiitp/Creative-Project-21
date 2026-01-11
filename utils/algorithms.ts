import { SortStep } from '../types';

// Helper to swap elements
const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// --- BUBBLE SORT ---
export function* bubbleSort(array: number[]): Generator<SortStep> {
  const arr = [...array];
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      // Comparison state
      yield { array: [...arr], activeIndices: [i, i + 1] };
      
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        swapped = true;
        // Swap state
        yield { array: [...arr], activeIndices: [i, i + 1] };
      }
    }
    n--; // Optimization: last element is already sorted
  } while (swapped);
  yield { array: [...arr], activeIndices: [] };
}

// --- INSERTION SORT ---
export function* insertionSort(array: number[]): Generator<SortStep> {
  const arr = [...array];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    
    yield { array: [...arr], activeIndices: [i, j], pivotIndex: i };

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      yield { array: [...arr], activeIndices: [j, j + 1], pivotIndex: i };
      j = j - 1;
    }
    arr[j + 1] = key;
    yield { array: [...arr], activeIndices: [j + 1] };
  }
  yield { array: [...arr], activeIndices: [] };
}

// --- QUICK SORT ---
function* quickSortRecursive(arr: number[], low: number, high: number): Generator<SortStep> {
  if (low < high) {
    // Partition
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      yield { array: [...arr], activeIndices: [j, high], pivotIndex: high }; // Compare with pivot
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j);
        yield { array: [...arr], activeIndices: [i, j], pivotIndex: high };
      }
    }
    swap(arr, i + 1, high);
    yield { array: [...arr], activeIndices: [i + 1, high], pivotIndex: i + 1 };
    
    const pi = i + 1;

    yield* quickSortRecursive(arr, low, pi - 1);
    yield* quickSortRecursive(arr, pi + 1, high);
  }
}

export function* quickSort(array: number[]): Generator<SortStep> {
  const arr = [...array];
  yield* quickSortRecursive(arr, 0, arr.length - 1);
  yield { array: [...arr], activeIndices: [] };
}

// --- HEAP SORT ---
function* heapify(arr: number[], n: number, i: number): Generator<SortStep> {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  if (l < n) {
    yield { array: [...arr], activeIndices: [largest, l] };
    if (arr[l] > arr[largest]) largest = l;
  }

  if (r < n) {
    yield { array: [...arr], activeIndices: [largest, r] };
    if (arr[r] > arr[largest]) largest = r;
  }

  if (largest !== i) {
    swap(arr, i, largest);
    yield { array: [...arr], activeIndices: [i, largest] };
    yield* heapify(arr, n, largest);
  }
}

export function* heapSort(array: number[]): Generator<SortStep> {
  const arr = [...array];
  const n = arr.length;

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // Extract
  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i);
    yield { array: [...arr], activeIndices: [0, i] };
    yield* heapify(arr, i, 0);
  }
  yield { array: [...arr], activeIndices: [] };
}

// --- MERGE SORT ---
// Merge sort is tricky to visualize in-place. We will simulate the overwrite steps.
function* merge(arr: number[], l: number, m: number, r: number): Generator<SortStep> {
  const n1 = m - l + 1;
  const n2 = r - m;

  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) L[i] = arr[l + i];
  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  let i = 0, j = 0, k = l;

  while (i < n1 && j < n2) {
    yield { array: [...arr], activeIndices: [l + i, m + 1 + j] }; // Comparing
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    yield { array: [...arr], activeIndices: [k] }; // Writing
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    yield { array: [...arr], activeIndices: [k] };
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    yield { array: [...arr], activeIndices: [k] };
    j++;
    k++;
  }
}

function* mergeSortRecursive(arr: number[], l: number, r: number): Generator<SortStep> {
  if (l >= r) return;
  const m = l + Math.floor((r - l) / 2);
  yield* mergeSortRecursive(arr, l, m);
  yield* mergeSortRecursive(arr, m + 1, r);
  yield* merge(arr, l, m, r);
}

export function* mergeSort(array: number[]): Generator<SortStep> {
  const arr = [...array];
  yield* mergeSortRecursive(arr, 0, arr.length - 1);
  yield { array: [...arr], activeIndices: [] };
}
