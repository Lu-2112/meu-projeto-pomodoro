import React, { useCallback, useMemo, useState } from 'react';
import { AuthContext, type AuthUser } from './AuthContext';
import { api } from '../../services/api';

const STORAGE_KEY = 'chronos-token';
const USER_KEY = 'chronos-user';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem(STORAGE_KEY)
  );

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await api.login({ email, password });

      if (data.token) {
        localStorage.setItem(STORAGE_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await api.register({ name, email, password });

      if (data.token) {
        localStorage.setItem(STORAGE_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, loading, user, login, register, logout }),
    [isAuthenticated, loading, user, login, register, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}