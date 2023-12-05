import React, { useEffect, useState } from 'react';
import sendRequest from '../../utilities/send-request';

const SquadPage = () => {
  const [userSquads, setUserSquads] = useState([]);
  const BASE_URL = '/api/squads';
  
  useEffect(() => {
    const fetchSquads = async () => {
      const res = await sendRequest(`${BASE_URL}/squads`);
      const data = await res.json();
      setUserSquads(data);
    }
  }, []);
  // might need a payload 



  return (
    <div>
      <h2>Your Squads</h2>
      <ul>
        {userSquads.map(squad => (
          <li key={squad._id}>{squad.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SquadPage;
