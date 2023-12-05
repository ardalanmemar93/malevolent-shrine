import React, { useEffect, useState } from 'react';
import sendRequest from '../../utilities/send-request';

const SquadPage = () => {
  const [userSquads, setUserSquads] = useState([]);
  const BASE_URL = '/api/squads';

  // Define fetchSquads outside the useEffect
  const fetchSquads = async () => {
    try {
      // Send the GET request to the server
      const res = await sendRequest(BASE_URL);
      // Set the list of squads in state
      setUserSquads(res);
    } catch (error) {
      console.error('Error fetching user squads:', error);
    }
  };

  useEffect(() => {
    // Invoke the async function
    fetchSquads();
  }, []);

  const handleDeleteSquad = async (squadId) => {
    try {
      // Send the DELETE request to the server
      await sendRequest(`${BASE_URL}/${squadId}`, 'DELETE');
      // Update state by removing the squad
      setUserSquads(userSquads.filter(squad => squad._id !== squadId));
    } catch (error) {
      console.error('Error deleting squad:', error);
    }
  };


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 neon-green">Your Squads</h2>
      <ul>
        {userSquads.map((squad) => (
          <li key={squad._id} className="mb-2 flex items-center justify-between bg-gray-100 p-2 rounded">
            <span className="text-lg">{squad.name}</span>
            <button
              onClick={() => handleDeleteSquad(squad._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SquadPage;
