import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewSquadPage from '../NewSquadPage/NewSquadPage';
import SquadPage from '../SquadPage/SquadPage';
import SquadUpdateForm from '../../components/SquadUpdateForm/SquadUpdateForm';
import NavBar from '../../components/NavBar/NavBar';
import AboutPage from '../AboutPage/AboutPage';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



export default function App() {
  const [user, setUser] = useState(getUser());
  const { squadId } = useParams();

  useEffect(() => {
  }, []);

  return (
    <div className="min-h-screen flex flex-col main">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <main className="flex-1">
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<SquadPage />} />
              <Route path="/squads/new" element={<NewSquadPage />} />
              <Route path="/squads" element={<SquadPage />} />
              <Route path="/update-squad/:squadId" element={<SquadUpdateForm user={user} squadId={squadId}/>} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </div>
  );
}
