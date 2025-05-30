import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './home/Home.tsx';
import Quiz from './quiz/Quiz.tsx';
import { QuizProvider } from './Contexts/QuizContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/quiz"
          element={
            <QuizProvider>
              <Quiz />
            </QuizProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
