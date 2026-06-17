// src/pages/Login/index.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { DefaultInput } from '../../components/DefaultInput';
import { useAuthContext } from '../../contexts/AuthContext'; 
import { showMessage } from '../../adapters/showMessage'; 
import { TimerIcon } from 'lucide-react'; 
import styles from './style.module.css'; 

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); 

 
    if (!username.trim()) {
      showMessage.warn('Informe o usuário');
      return;
    }
    if (!password) {
      showMessage.warn('Informe a senha');
      return;
    }

    
    if (login(username, password)) {
      showMessage.success('Bem-vindo!');
      navigate('/home'); 
    } else {
      showMessage.error('Usuário ou senha inválidos');
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
          <p className={styles.subtitle}>Faça login para acessar o sistema do Pomodoro</p>
        </div>

     
        <form onSubmit={handleSubmit} className={styles.form}>
          
       
          <DefaultInput
            id="login-user"
            labelText="Usuário"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <DefaultInput
            id="login-pass"
            labelText="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.button}>
            Entrar
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.25rem', textAlign: 'center' }}>
            <button 
              type="button" 
              onClick={() => showMessage.info('Cadastro em breve')}
              style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
            >
              Cadastrar
            </button>
            
            <button 
              type="button" 
              onClick={() => showMessage.info('Recuperação em breve')}
              style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
            >
              Esqueci minha senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}