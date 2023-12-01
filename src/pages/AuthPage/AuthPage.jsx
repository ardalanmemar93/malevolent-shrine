import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';


export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <main className="text-white bg-gradient-to-r min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 neon">Malevolent Shrine</h1>
        <button
          className={`neon px-4 py-2 rounded-full transition duration-300 focus:outline-none ${showSignUp ? 'bg-red-500 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'}`}
          onClick={() => setShowSignUp(!showSignUp)}
        >
          {showSignUp ? 'Log In' : 'Sign Up'}
        </button>
        {showSignUp ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} />}
      </div>
    </main>
  );
}