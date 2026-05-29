// src/routers/MainRouter/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../../pages/Login';
import { Home } from '../../pages/Home';
import { History } from '../../pages/History';
import { AboutPomodoro } from '../../pages/AboutPomodoro'; 
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { PublicOnlyRoute } from '../../components/PublicOnlyRoute';

export function MainRouter() {
  return (
    <Routes>
      {/* Rota Pública Inicial */}
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />

      {/* Rota Protegida: Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Rota Protegida: Histórico */}
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      {/* 🛡️ MAPEANDO TODAS AS VARIANTES POSSÍVEIS PARA O ABOUT 🛡️ */}
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <AboutPomodoro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about-pomodoro"
        element={
          <ProtectedRoute>
            <AboutPomodoro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/aboutpomodoro"
        element={
          <ProtectedRoute>
            <AboutPomodoro />
          </ProtectedRoute>
        }
      />

      {/* Rota de segurança padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}