import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultInput } from '../../components/DefaultInput';
import { showMessage } from '../../adapters/showMessage';
import { TimerIcon } from 'lucide-react';
import { api } from '../../services/api';
import styles from '../Login/style.module.css';

export function ResetPassword() {
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    if (!email.trim()) {
      showMessage.warn('Informe o email');
      return;
    }

    setLoading(true);
    try {
      const data = await api.forgotPassword(email);
      showMessage.success('Instruções enviadas!');
      // Em dev, mostramos o token no console — checar terminal do backend
      console.log('Token de reset:', data.resetToken);
      setStep('reset');
    } catch {
      showMessage.error('Erro ao enviar instruções');
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    if (!token.trim()) {
      showMessage.warn('Informe o token recebido');
      return;
    }
    if (!password) {
      showMessage.warn('Informe a nova senha');
      return;
    }

    setLoading(true);
    try {
      await api.resetPassword({ token, password });
      showMessage.success('Senha redefinida com sucesso!');
      navigate('/');
    } catch {
      showMessage.error('Token inválido ou expirado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoArea}>
            <TimerIcon size={32} aria-label="Logo do Chronos Pomodoro" />
            <span>Chronos</span>
          </div>
          <p className={styles.subtitle}>
            {step === 'email' ? 'Recuperar senha' : 'Redefinir senha'}
          </p>
        </div>

        {step === 'email' && (
          <form onSubmit={handleForgotPassword} className={styles.form}>
            <DefaultInput
              id="reset-email"
              labelText="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Aguarde...' : 'Enviar instruções'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
              >
                Voltar ao login
              </button>
            </div>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className={styles.form}>
            <DefaultInput
              id="reset-token"
              labelText="Token recebido"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <DefaultInput
              id="reset-password"
              labelText="Nova senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Aguarde...' : 'Redefinir senha'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}