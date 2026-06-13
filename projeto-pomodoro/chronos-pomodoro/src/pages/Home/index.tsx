import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../templates/MainTemplate';
import { useAuthContext } from '../../contexts/AuthContext';

export function Home() {
  const { user } = useAuthContext();

  return (
    <MainTemplate>
      <Container>
        {user && (
          <p style={{ textAlign: 'center', color: '#8da2bb', marginBottom: '1rem' }}>
            Olá, <strong>{user.name}</strong>! Pronto para focar? 🍅
          </p>
        )}
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}