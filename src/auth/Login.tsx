import { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router';
// import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { signInUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await signInUser(email, password);
    if (result.success) {
      setStatus('success');
      setMessage('Login successful!');
      setTimeout(() => navigate('/'), 1000); // Redirect to home or dashboard
    } else {
      setStatus('error');
      setMessage(result.error!);
    }
  };

  return (
    <div className="w-full h-dvh bg-bgall flex flex-col items-center justify-center font-main px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-dblue text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dblue"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dblue"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full py-2 rounded-md text-white font-semibold transition ${
            status === 'loading'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-btnDefault hover:bg-dblue'
          }`}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <div
            className={`text-center text-sm ${
              status === 'success' ? 'text-cgreen' : 'text-red-500'
            }`}
          >
            {message}
          </div>
        )}

        <p className="text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-dblue font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
