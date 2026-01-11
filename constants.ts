import { AlgorithmType, DatasetType } from './types';

export const ARRAY_SIZE = 60; // Number of bars
export const ANIMATION_SPEED_MULTIPLIER = 2; // Steps per frame (higher = faster sorting)

export const ALGORITHMS = [
  AlgorithmType.QUICK,
  AlgorithmType.MERGE,
  AlgorithmType.HEAP,
  AlgorithmType.BUBBLE,
  AlgorithmType.INSERTION
];

export const DATASETS = [
  DatasetType.RANDOM,
  DatasetType.NEARLY_SORTED,
  DatasetType.REVERSED,
  DatasetType.FEW_UNIQUE
];

export const THEME = {
  player: {
    primary: '#06b6d4', // Cyan 500
    accent: '#22d3ee', // Cyan 400
    glow: 'rgba(6, 182, 212, 0.5)'
  },
  cpu: {
    primary: '#ec4899', // Pink 500
    accent: '#f472b6', // Pink 400
    glow: 'rgba(236, 72, 153, 0.5)'
  }
};
