// src/utils/sortTasks.ts
import type { TaskModel } from '../models/TaskModel';

export type SortTasksOptions = {
  tasks: TaskModel[]; 
  direction?: 'asc' | 'desc'; 
  field?: keyof TaskModel; 
};

export function sortTasks({
  field = 'startDate', 
  direction = 'desc', 
  tasks = [], 
}: SortTasksOptions): TaskModel[] {
  
  return [...tasks].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // --- TRATANDO VALORES NULOS ---
    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    // --- COMPARAÇÃO NUMÉRICA ---
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc'
        ? aValue - bValue 
        : bValue - aValue; 
    }

    // --- COMPARAÇÃO DE STRINGS ---
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue); 
    }

    return 0;
  });
}