// src/contexts/TaskContext/TaskContextProvider.tsx
import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './TaskReducer';
import { TaskContext } from './TaskContext';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './TaskActions';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { api } from '../../services/api';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state');

    if (storageState === null) return initialTaskState;

    try {
      const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

      return {
        ...parsedStorageState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
      };
    } catch {
      return initialTaskState;
    }
  });

  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const worker = TimerWorkerManager.getInstance();
  const activeTaskRef = useRef(state.activeTask);

  // Mantém a referência da activeTask atualizada
  useEffect(() => {
    activeTaskRef.current = state.activeTask;
  }, [state.activeTask]);

  useEffect(() => {
    worker.onmessage(e => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current.play();
          playBeepRef.current = null;
        }

        // Marca task como completa na API
        if (activeTaskRef.current) {
          api.completeTask(activeTaskRef.current.id, Date.now()).catch(() => {
            console.error('Erro ao completar task na API');
          });
        }

        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        worker.terminate();
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });
  }, [worker]);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));

    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}