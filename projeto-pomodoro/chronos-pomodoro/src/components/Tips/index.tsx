import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

type TipKeys = 'workTime' | 'shortBreakTime' | 'longBreakTime';

export function Tips() {
  const { state } = useTaskContext();
  
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle) as TipKeys;

  
  const tipsForNoActiveTask: Record<TipKeys, React.JSX.Element> = {
    workTime: (
      <span>
        Próximo ciclo é de <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>Próximo descanso é de {state.config.shortBreakTime}min</span>
    ),
    longBreakTime: <span>Próximo descanso será longo</span>,
  };

  
  const taskAtiva = state.activeTask as any;

  if (taskAtiva) {
    const currentType = taskAtiva.type as TipKeys;

    if (currentType === 'workTime') {
      return <span>Foque por {state.config.workTime}min</span>;
    }
    if (currentType === 'shortBreakTime') {
      return <span>Descanse por {state.config.shortBreakTime}min</span>;
    }
    if (currentType === 'longBreakTime') {
      return <span>Descanso longo</span>;
    }
  }

  
  return <>{tipsForNoActiveTask[nextCycleType]}</>;
}