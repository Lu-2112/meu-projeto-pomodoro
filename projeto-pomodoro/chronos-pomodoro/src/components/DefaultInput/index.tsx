// src/components/DefaultInput/index.tsx
import { forwardRef } from 'react';
import styles from './styles.module.css';

interface DefaultInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  id: string;
}

export const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  ({ labelText, id, ...props }, ref) => {
   
    const shouldShowLabel = labelText && labelText !== 'task';

    return (
      <div className={styles.inputContainer}>
        {shouldShowLabel && (
          <label htmlFor={id} className={styles.label}>
            {labelText}
          </label>
        )}
        
        <input
          id={id}
          ref={ref}
          className={styles.input}
          {...props}
        />
      </div>
    );
  }
);

DefaultInput.displayName = 'DefaultInput';