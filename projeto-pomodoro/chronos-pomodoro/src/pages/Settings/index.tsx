// src/pages/Settings/index.tsx
import React, { useRef, useContext, useEffect } from 'react';
import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { TaskContext } from '../../contexts/TaskContext/TaskContext';

export function Settings() {
  const taskContext = useContext(TaskContext) as any;
  const state = taskContext?.state;
  const dispatch = taskContext?.dispatch;

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

 
  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const formErrors: string[] = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Digite apenas números para TODOS os campos');
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push('Digite valores entre 1 e 99 para foco');
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('Digite valores entre 1 e 30 para descanso curto');
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('Digite valores entre 1 e 60 para descanso longo');
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error);
      });
      return;
    }

    if (dispatch) {
      dispatch({
        type: TaskActionTypes.CHANGE_SETTINGS,
        payload: {
          workTime,
          shortBreakTime,
          longBreakTime,
        },
      });
      showMessage.success('Configurações salvas');
    }
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center', color: '#8da2bb' }}>
          Modifique as configurações para tempo de foco, descanso curto e descanso longo.
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} className='form'>
          <div className='formRow'>
            <DefaultInput
              id='workTime'
              labelText='Foco'
              ref={workTimeInput}
              defaultValue={state?.config?.workTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInput}
              defaultValue={state?.config?.shortBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInput}
              defaultValue={state?.config?.longBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}