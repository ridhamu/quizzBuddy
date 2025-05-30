import type { ReactNode } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Navigate } from 'react-router';
import { Spinner } from 'flowbite-react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <Spinner className="size-20 text-white fill-cgreen" />
      </div>
    );
  return session === null ? <Navigate to="/login" /> : children;
}

export default ProtectedRoute;
