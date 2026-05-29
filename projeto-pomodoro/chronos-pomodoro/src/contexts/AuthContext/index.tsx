// src/contexts/AuthContext/index.tsx
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuthContext() {
  const context = useContext(AuthContext);


  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthContextProvider');
  }

  return context;
}