import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultInput } from '../../components/DefaultInput';
import { useAuthContext } from '../../contexts/AuthContext';
import { showMessage } from '../../adapters/showMessage';
import { TimerIcon } from 'lucide-react';
import styles from './style.module.css';

export function Login() {
  const navigate = useNavigate();
  const { login, register, loading } = useAuthContext();

  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    if (!email.trim()) {
      showMessage.warn('Informe o email');
      return;
    }
    if (!password && !isForgotPassword) {
      showMessage.warn('Informe a senha');
      return;
    }

    if (isForgotPassword) {
      navigate(`/reset-password`);
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        showMessage.warn('Informe o nome');
        return;
      }
      const ok = await register(name, email, password);
      if (ok) {
        showMessage.success('Cadastro realizado com sucesso!');
        navigate('/home');
      } else {
        showMessage.error('Erro ao cadastrar. Email já existe?');
      }
      return;
    }

    const ok = await login(email, password);
    if (ok) {
      showMessage.success('Bem-vindo!');
      navigate('/home');
    } else {
      showMessage.error('Email ou senha inválidos');
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
            {isRegister ? 'Crie sua conta' : 'Faça login para acessar o Pomodoro'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegister && (
            <DefaultInput
              id="login-name"
              labelText="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <DefaultInput
            id="login-email"
            labelText="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isForgotPassword && (
            <DefaultInput
              id="login-pass"
              labelText="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Aguarde...' : isRegister ? 'Cadastrar' : isForgotPassword ? 'Enviar' : 'Entrar'}
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.25rem', textAlign: 'center' }}>
            {!isForgotPassword && (
              <button
                type="button"
                onClick={() => { setIsRegister(!isRegister); showMessage.dismiss(); }}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
              >
                {isRegister ? 'Já tenho conta' : 'Cadastrar'}
              </button>
            )}

            <button
              type="button"
              onClick={() => { setIsForgotPassword(!isForgotPassword); setIsRegister(false); showMessage.dismiss(); }}
              style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
            >
              {isForgotPassword ? 'Voltar ao login' : 'Esqueci minha senha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}