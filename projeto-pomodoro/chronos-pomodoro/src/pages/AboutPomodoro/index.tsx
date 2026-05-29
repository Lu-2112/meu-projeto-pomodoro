// src/pages/AboutPomodoro/index.tsx
import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

export function AboutPomodoro() {
  
  useEffect(() => {
    document.title = 'Entenda a Técnica Pomodoro - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <Heading>A Técnica Pomodoro 🍅</Heading>
          <p>A técnica consiste na utilização de um cronômetro para organizar o trabalho em períodos de 25 minutos, separados por breves intervalos.</p>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}