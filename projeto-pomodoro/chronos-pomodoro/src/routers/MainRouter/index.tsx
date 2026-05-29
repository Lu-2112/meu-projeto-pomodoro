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
  
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />

    
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

   
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

   
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <AboutPomodoro />
          </ProtectedRoute>
        }
      />

    
      <Route path="/about-pomodoro" element={<Navigate to="/about" replace />} />
      <Route path="/aboutpomodoro" element={<Navigate to="/about" replace />} />


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}