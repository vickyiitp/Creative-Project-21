export enum AlgorithmType {
  BUBBLE = 'Bubble Sort',
  QUICK = 'Quick Sort',
  MERGE = 'Merge Sort',
  HEAP = 'Heap Sort',
  INSERTION = 'Insertion Sort'
}

export enum DatasetType {
  RANDOM = 'Random Chaos',
  NEARLY_SORTED = 'Nearly Sorted',
  REVERSED = 'Reversed Order',
  FEW_UNIQUE = 'Few Unique Values'
}

export enum GameState {
  LANDING = 'LANDING',
  MENU = 'MENU',
  PREPARING = 'PREPARING',
  RACING = 'RACING',
  FINISHED = 'FINISHED'
}

export interface SortStep {
  array: number[];
  activeIndices: number[]; // Indices currently being compared/swapped
  pivotIndex?: number;    // Special highlight for pivot
}

export interface PlayerStats {
  name: string;
  algorithm: AlgorithmType | null;
  progress: number; // 0 to 100
  finished: boolean;
  timeTaken: number;
}