import { DatasetType } from '../types';
import { ARRAY_SIZE } from '../constants';

export const generateDataset = (type: DatasetType): number[] => {
  const arr = Array.from({ length: ARRAY_SIZE }, (_, i) => i + 1);

  switch (type) {
    case DatasetType.RANDOM:
      return shuffle(arr);
    
    case DatasetType.NEARLY_SORTED:
      // Swap a few pairs randomly
      for (let i = 0; i < ARRAY_SIZE / 5; i++) {
        const idx1 = Math.floor(Math.random() * ARRAY_SIZE);
        const idx2 = Math.floor(Math.random() * ARRAY_SIZE);
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      }
      return arr;
      
    case DatasetType.REVERSED:
      return arr.reverse();

    case DatasetType.FEW_UNIQUE:
      return arr.map(() => Math.floor(Math.random() * 5) * (ARRAY_SIZE / 5));

    default:
      return shuffle(arr);
  }
};

const shuffle = (array: number[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};
