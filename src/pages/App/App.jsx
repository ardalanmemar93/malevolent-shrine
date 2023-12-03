import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewSquadPage from '../NewSquadPage/NewSquadPage';
import SquadPage from '../SquadPage/SquadPage';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect } from 'react';
import getCharacter from '../../utilities/jikan-api';

export default function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    getCharacter(7);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <main className="flex-1">
            <Routes>
              {/* Route components in here */}
              <Route path="/squads/new" element={<NewSquadPage />} />
              <Route path="/squads" element={<SquadPage />} />
            </Routes>
          </main>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </div>
  );
}
