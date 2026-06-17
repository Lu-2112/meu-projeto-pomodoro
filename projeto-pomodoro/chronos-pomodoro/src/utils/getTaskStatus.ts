// src/utils/getTaskStatus.ts
import type { TaskModel } from '../models/TaskModel'; // Certifique-se de que o caminho do seu modelo de Task está correto

/**
 * Centraliza a regra de negócio para definir o status textual de uma tarefa em português.
 * * @param task A tarefa que está sendo renderizada na linha da tabela.
 * @param activeTask A tarefa atualmente ativa no timer (pode ser null).
 * @returns String formatada com o status ('Completa', 'Interrompida', 'Em Progresso' ou 'Abandonada').
 */
export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null): string {
  // 1. Se tem data de conclusão, está finalizada
  if (task.completeDate) {
    return 'Completa';
  }
  
  // 2. Se tem data de interrupção, foi parada manualmente
  if (task.interruptDate) {
    return 'Interrompida';
  }
  
  // 3. Se não tem datas, mas o ID bate com a tarefa ativa do contexto, está rodando no timer
  if (task.id === activeTask?.id) {
    return 'Em Progresso';
  }
  
  // 4. Se não se encaixou em nenhuma regra anterior, a tarefa ficou pendente/esquecida
  return 'Abandonada';
}