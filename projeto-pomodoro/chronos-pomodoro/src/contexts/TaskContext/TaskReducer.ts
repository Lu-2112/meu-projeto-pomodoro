// src/contexts/TaskContext/TaskReducer.ts
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes'; 
import { TaskActionTypes, type TaskActionModel } from './TaskActions';
import type { TaskStateModel } from '../../models/TaskStateModel';

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      return {
        ...state,
        activeTask: action.payload,
        secondsRemaining: action.payload.duration * 60,
        formattedSecondsRemaining: formatSecondsToMinutes(action.payload.duration * 60),
        currentCycle: state.currentCycle + 1,
      };
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      if (!state.activeTask) return state;

      // Cria o registro da tarefa interrompida com a data atual
      const interruptedTask = {
        ...state.activeTask,
        interruptDate: Date.now(),
      };

      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: [...state.tasks, interruptedTask], // 🚀 Adiciona a tarefa de verdade no histórico!
      };
    }

    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }

    case TaskActionTypes.COMPLETE_TASK: {
      if (!state.activeTask) return state;

      // Cria o registro da tarefa completada com sucesso
      const completedTask = {
        ...state.activeTask,
        completeDate: Date.now(),
      };

      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: [...state.tasks, completedTask], // 🚀 Adiciona a tarefa de verdade no histórico!
      };
    }

    case TaskActionTypes.RESET_STATE: {
      return {
        ...state,
        tasks: [],
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        currentCycle: 0,
      };
    }

    default:
      return state;
  }
}