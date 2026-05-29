// src/components/PublicOnlyRoute/index.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { isAuthenticated } = useAuthContext();

 
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

 
  return <>{children}</>;
}