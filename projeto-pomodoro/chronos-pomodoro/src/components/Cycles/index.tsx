import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'; // Ajustado para o seu caminho profissional
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  // 1. Cria um array com o tamanho exato do ciclo atual (ex: se for 3, cria um array com 3 posições)
  const cycleStep = Array.from({ length: state.currentCycle });

  // 2. Dicionário para traduzir os tipos de ciclo para texto legível (Acessibilidade)
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);

          return (
            <span
              
              key={nextCycle}
              
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}