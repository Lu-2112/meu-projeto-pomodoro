// src/utils/formatDate.ts
import { format } from 'date-fns';

export function formatDate(timestamp: number) {
  if (!timestamp) return '---';
  
  const date = new Date(timestamp);
  return format(date, 'dd/MM/yyyy HH:mm');
}