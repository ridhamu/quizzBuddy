// hooks/useTimer.ts
import { useEffect, useState } from 'react';

export function useTimer(isActive: boolean, onExpire: () => void, initialTime = 300) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onExpire]);

  const reset = () => setTimeLeft(initialTime);

  return { timeLeft, reset };
}
