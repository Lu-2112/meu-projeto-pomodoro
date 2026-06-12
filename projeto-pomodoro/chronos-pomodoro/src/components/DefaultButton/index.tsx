import type { ComponentProps, ReactNode } from 'react';
import styles from './styles.module.css';

// 1. Adicionamos 'color' opcional na interface
interface DefaultButtonProps extends ComponentProps<'button'> {
  icon?: ReactNode;
  color?: 'red'; // 👈 Aceita especificamente a cor 'red'
}

export function DefaultButton({ icon, children, color, className, ...props }: DefaultButtonProps) {
  // 2. Criamos a lógica para aplicar a classe vermelha se a prop color for 'red'
  const buttonClassName = `${styles.button} ${color === 'red' ? styles.red : ''} ${className ?? ''}`.trim();

  return (
    <button className={buttonClassName} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}