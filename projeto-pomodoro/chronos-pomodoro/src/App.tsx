// src/App.tsx
import { BrowserRouter } from 'react-router'; 
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider'; 
import { MessagesContainer } from './components/MessagesContainer'; 
import { MainRouter } from './routers/MainRouter';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <TaskContextProvider>
          <MessagesContainer>
            <MainRouter />
          </MessagesContainer>
        </TaskContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}