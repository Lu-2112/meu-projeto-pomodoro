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
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          const currentActive = state.activeTask as any;
          if (currentActive && currentActive.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
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
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          const currentActive = state.activeTask as any;
          if (currentActive && currentActive.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
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