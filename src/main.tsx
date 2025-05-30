import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './home/Home.tsx';
import Quiz from './quiz/Quiz.tsx';
import { QuizProvider } from './Contexts/QuizContext.tsx';
import Register from './auth/Register.tsx';
import Login from './auth/Login.tsx';
import { AuthProvider } from './Contexts/AuthContext.tsx';
import ProtectedRoute from './auth/ProtectedRoute.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizProvider>
                  <Quiz />
                </QuizProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
