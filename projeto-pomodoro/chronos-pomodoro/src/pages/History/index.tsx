import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../contexts/TaskContext/TaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { showMessage } from '../../adapters/showMessage';
import { api } from '../../services/api';

export function History() {
  const taskContext = useContext(TaskContext) as any;
  const state = taskContext?.state;
  const dispatch = taskContext?.dispatch;

  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const hasTasks = state?.tasks ? state.tasks.length > 0 : false;

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({ tasks: state?.tasks || [] }),
      field: 'startDate',
      direction: 'desc',
    };
  });

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  // Carrega tasks da API ao abrir o histórico
  useEffect(() => {
    setIsLoadingHistory(true);
    api.getTasks()
      .then((tasks) => {
        if (dispatch && tasks && tasks.length > 0) {
          tasks.forEach((task: any) => {
            dispatch({
              type: TaskActionTypes.START_TASK,
              payload: {
                ...task,
                startDate: Number(task.startDate),
                completeDate: task.completeDate ? Number(task.completeDate) : null,
                interruptDate: task.interruptDate ? Number(task.interruptDate) : null,
              },
            });
          });
        }
      })
      .catch(() => {
        showMessage.error('Erro ao carregar histórico');
      })
      .finally(() => {
        setIsLoadingHistory(false);
      });
  }, []);

  useEffect(() => {
    if (state?.tasks) {
      setSortTaskOptions(prevState => ({
        ...prevState,
        tasks: sortTasks({
          tasks: state.tasks,
          direction: prevState.direction,
          field: prevState.field,
        }),
      }));
    }
  }, [state?.tasks]);

  useEffect(() => {
    if (!confirmClearHistory || !dispatch) return;
    setConfirmClearHistory(false);

    api.deleteTasks()
      .then(() => {
        dispatch({ type: TaskActionTypes.RESET_STATE });
        showMessage.success('Histórico apagado!');
      })
      .catch(() => {
        showMessage.error('Erro ao apagar histórico');
      });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

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

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && !isLoadingHistory && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {isLoadingHistory && (
          <p style={{ textAlign: 'center', color: '#8da2bb' }}>
            Carregando histórico...
          </p>
        )}

        {!isLoadingHistory && hasTasks && (
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
                {sortTasksOptions.tasks.map((task: any) => {
                  const taskTypeDictionary: any = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  };
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state?.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!isLoadingHistory && !hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}