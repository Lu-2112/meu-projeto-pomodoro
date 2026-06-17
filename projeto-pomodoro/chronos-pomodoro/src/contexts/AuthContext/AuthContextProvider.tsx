// src/contexts/AuthContext/AuthContextProvider.tsx
import React, { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { validateMockLogin } from '../../utils/validateMockLogin'; 


const STORAGE_KEY = "chronos-auth";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem(STORAGE_KEY) === '1'
  );


  const login = useCallback((username: string, password: string) => {
    const ok = validateMockLogin(username, password);
    
    if (ok) {
      sessionStorage.setItem(STORAGE_KEY, '1'); 
      setIsAuthenticated(true);
    }
    
    return ok;
  }, []);


  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

 
  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}