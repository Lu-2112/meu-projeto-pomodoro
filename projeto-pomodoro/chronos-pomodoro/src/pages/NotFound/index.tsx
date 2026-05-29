// src/pages/NotFound/index.tsx
import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

export function NotFound() {
  
  useEffect(() => {
    document.title = 'Página não encontrada - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <Heading>404 - Página não encontrada 🚀</Heading>
          <p style={{ textAlign: 'center' }}>O link que você tentou acessar não existe ou foi movido.</p>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}