import type { TaskStateModel } from '../../models/TaskStateModel';

export const initialTaskState: TaskStateModel = {
  config: {
    workTime: 1,         // Tempo de teste (1 minuto)
    shortBreakTime: 1,
    longBreakTime: 1,
  },
  tasks: [],            
  activeTask: null,     
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  currentCycle: 0,
};