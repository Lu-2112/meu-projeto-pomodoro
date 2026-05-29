// src/pages/History/index.tsx
import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate'; // 🚀 Importando seu novo formatador

export function History() {
  // Usando o hook correto do seu projeto para não dar erro no terminal
  const { state } = useTaskContext();
  
  const rawTasks = state.tasks || [];
  const tasksNewestFirst = [...rawTasks].reverse();

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {tasksNewestFirst.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '2rem' }}>
                    Nenhuma tarefa encontrada no histórico.
                  </td>
                </tr>
              )}

              {tasksNewestFirst.map((task: any, index: number) => {
                return (
                  <tr key={task.id || index}>
                    <td>{task.name || 'Sem nome'}</td>
                    <td>{task.duration || 0}min</td>
                    
                    {/* 🚀 Exibindo a data com o padrão: dd/MM/yyyy HH:mm */}
                    <td>{formatDate(task.startDate)}</td>
                    
                    <td>
                      {task.interruptDate 
                        ? 'Interrompida' 
                        : task.completeDate 
                        ? 'Completa' 
                        : 'Em progresso'}
                    </td>
                    <td>{task.type || 'workTime'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}