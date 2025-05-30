import { Link, useNavigate } from 'react-router';
import { useAuth } from '../Contexts/AuthContext';

export default function Home() {
  const { session, signOutUser } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate('/login');
  };

  return (
    <div className="w-full h-dvh bg-bgall flex flex-col items-center justify-center gap-4 md:gap-8">
      <h1 className="text-center font-bold text-3xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-dblue to-cgreen py-2 animate-pulse">
        Welcome to QuizzBuddy!
      </h1>
      {/* CTA */}
      <div className="w-1/2 p-2 md:max-w-lg flex items-center justify-center">
        <Link
          to="/quiz"
          className="bg-btnDefault text-bgall font-normal sm:text-xl text-lg capitalize text-center py-2 px-8 h-10 md:h-16 w-full rounded-lg transition duration-200 ease-in-out hover:shadow-lg hover:-translate-y-2 hover:font-bold hover:bg-cgreen cursor-pointer flex items-center justify-center"
        >
          GET ME IN 🔥
        </Link>
      </div>

      {/* logout button */}
      {session && (
        <div className="w-1/2 p-2 md:max-w-lg flex items-center justify-center">
          <button
            onClick={handleSignOut}
            className="bg-btnDefault text-bgall font-normal sm:text-xl text-lg capitalize text-center py-2 px-8 h-10 md:h-16 w-full rounded-lg transition duration-200 ease-in-out hover:shadow-lg hover:-translate-y-2 hover:font-bold hover:bg-cred cursor-pointer flex items-center justify-center"
          >
            Log Out 🚪
          </button>
        </div>
      )}
    </div>
  );
}
