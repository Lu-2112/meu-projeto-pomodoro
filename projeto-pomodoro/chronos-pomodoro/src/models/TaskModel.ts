// src/models/TaskModel.ts
import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string; // Identificador único da tarefa (geralmente um UUID ou id aleatório)
  name: string; // Nome digitado pelo usuário no input de tarefas
  duration: number; // Duração em minutos
  startDate: number; // Timestamp (número) de quando começou
  completeDate: number | null; // Preenchido quando o timer chega ao final
  interruptDate: number | null; // Preenchido se o usuário clicar em parar
  type: keyof TaskStateModel['config']; // Diz se é trabalho, pausa curta ou longa
};