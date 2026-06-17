// src/contexts/AuthContext/AuthContext.tsx
import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

// Criamos o contexto vazio inicialmente
export const AuthContext = createContext<AuthContextType | undefined>(undefined);