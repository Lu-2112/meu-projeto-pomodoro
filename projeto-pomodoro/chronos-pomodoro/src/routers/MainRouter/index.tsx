import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { NotFound } from '../../pages/NotFound';
import { Home } from '../../pages/Home';
import { History } from '../../pages/History';
import { Settings } from '../../pages/Settings';
import { Login } from '../../pages/Login';
import { ResetPassword } from '../../pages/ResetPassword';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);
  const token = localStorage.getItem('chronos-token');

  if (!authContext || !authContext.isAuthenticated || !token) {
    return <Login />;
  }

  return <>{children}</>;
}

export function MainRouter() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />

        <Route path='/history/' element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path='/history' element={<ProtectedRoute><History /></ProtectedRoute>} />

        <Route path='/settings/' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        <Route path='/about-pomodoro/' element={<ProtectedRoute><AboutPomodoro /></ProtectedRoute>} />
        <Route path='/about-pomodoro' element={<ProtectedRoute><AboutPomodoro /></ProtectedRoute>} />

        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}