import React from 'react';
import styles from './styles.module.css';

type DefaultButtonProps = {
  icon: React.ReactNode; // Aceita componentes, texto, HTML, etc.
  color?: 'green' | 'red'; // Union Type: Só aceita essas duas strings específicas
} & React.ComponentProps<'button'>; // Herda propriedades nativas (onClick, disabled, etc.)

export function DefaultButton({
  icon,
  color = 'green', // Valor padrão caso nenhuma cor seja enviada
  ...props
}: DefaultButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]}`} {...props}>
      {icon}
    </button>
  );
}