import React from 'react'; // Importação necessária para o ReactNode
import styles from './styles.module.css';

// 1. Criamos o "contrato" (Tipagem)
type HeadingProps = {
  children: React.ReactNode; 
};

// 2. Usamos a DESESTRUTURAÇÃO { children } para o código ficar limpo
export function Heading({ children }: HeadingProps) {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        {children}
      </h1>
      <h2 className={styles.subtitle}>Seu tempo, seu ritmo.</h2>
    </header>
  );
}