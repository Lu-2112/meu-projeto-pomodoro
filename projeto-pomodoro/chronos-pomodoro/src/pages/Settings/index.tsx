import React, { useRef, useContext, useEffect, useState } from 'react';
import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { TaskContext } from '../../contexts/TaskContext/TaskContext';
import { api } from '../../services/api';

export function Settings() {
  const taskContext = useContext(TaskContext) as any;
  const state = taskContext?.state;
  const dispatch = taskContext?.dispatch;

  const [isSaving, setIsSaving] = useState(false);

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';

    api.getSettings().then((settings) => {
      if (dispatch && settings) {
        dispatch({
          type: TaskActionTypes.CHANGE_SETTINGS,
          payload: {
            workTime: settings.workTime,
            shortBreakTime: settings.shortBreakTime,
            longBreakTime: settings.longBreakTime,
          },
        });
      }
    }).catch(() => {
      showMessage.error('Erro ao carregar configurações');
    });
  }, []);

  async function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
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
      formErrors.forEach(error => showMessage.error(error));
      return;
    }

    try {
      setIsSaving(true);
      await api.saveSettings({ workTime, shortBreakTime, longBreakTime });

      if (dispatch) {
        dispatch({
          type: TaskActionTypes.CHANGE_SETTINGS,
          payload: { workTime, shortBreakTime, longBreakTime },
        });
      }
      showMessage.success('Configurações salvas');
    } catch {
      showMessage.error('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
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
              disabled={isSaving}
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInput}
              defaultValue={state?.config?.shortBreakTime}
              type='number'
              disabled={isSaving}
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInput}
              defaultValue={state?.config?.longBreakTime}
              type='number'
              disabled={isSaving}
            />
          </div>
          <div className='formRow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label={isSaving ? 'Salvando...' : 'Salvar configurações'}
              title={isSaving ? 'Salvando...' : 'Salvar configurações'}
              disabled={isSaving}
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}