// src/pages/History/index.tsx
import { useEffect, useState } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';
import { getTaskStatus } from '../../utils/getTaskStatus'; 
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { showMessage } from '../../adapters/showMessage';
import { TrashIcon } from 'lucide-react';
import styles from './styles.module.css';

export function History() {
  const { state, dispatch } = useTaskContext();
  

  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  
  const hasTasks = state.tasks.length > 0;

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    }
  );

 
  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  
  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false); 
    dispatch({ type: TaskActionTypes.RESET_STATE }); 
  }, [confirmClearHistory, dispatch]);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  
  function handleResetHistory() {
    showMessage.dismiss(); 
    showMessage.confirm('Tem certeza?', confirmation => {
      setConfirmClearHistory(confirmation); 
    });
  }

  function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <MainTemplate>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--text-default)' }}>History</h1>
          
          {hasTasks && (
            <button 
              className={styles.buttonContainer} 
              onClick={handleResetHistory}
              title="Apagar histórico"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--red)' }}
            >
              <TrashIcon size={24} />
            </button>
          )}
        </div>

        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>
                    Tarefa ↕
                  </th>
                  <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>
                    Duração ↕
                  </th>
                  <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.8rem', color: 'var(--text-muted)', marginTop: '4rem' }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}