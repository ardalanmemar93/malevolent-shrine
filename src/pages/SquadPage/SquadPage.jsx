import React, { useEffect, useState } from 'react';
import sendRequest from '../../utilities/send-request';

const SquadPage = () => {
  const [userSquads, setUserSquads] = useState([]);
  const BASE_URL = '/api/squads';
  
  useEffect(() => {
    // Fetch the user's squads
    const fetchSquads = async () => {
      // Send the GET request to the server
      const res = await sendRequest(BASE_URL);
      // Set the list of squads in state
      setUserSquads(res);
    }
    // Invoke the async function
    fetchSquads();
  }, []);


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
