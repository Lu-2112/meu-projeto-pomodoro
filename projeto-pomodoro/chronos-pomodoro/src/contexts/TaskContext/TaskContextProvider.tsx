import { useEffect, useReducer, type ReactNode } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './TaskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './TaskActions';

interface TaskContextProviderProps {
  children: ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  

  const worker = TimerWorkerManager.getInstance();

 
  useEffect(() => {
    console.log('ESTADO ATUALIZADO VIA REDUCER:', state);
  }, [state]);

  
  useEffect(() => {
    worker.onmessage((e) => {
      const countDownSeconds = e.data;

    
      if (countDownSeconds <= 0) {
       
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
    if (!state.activeTask) {
      console.log('🛑 Worker terminado por falta de activeTask');
      worker.terminate();
      return;
    }

   
    worker.postMessage(state);
    
 
  }, [worker, (state.activeTask as any)?.id]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}