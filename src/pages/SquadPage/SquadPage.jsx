import React, { useEffect, useState } from 'react';
import sendRequest from '../../utilities/send-request';

const SquadPage = () => {
  const [userSquads, setUserSquads] = useState([]);
  const [selectedSquad, setSelectedSquad] = useState(null);
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




  const handleSquadClick = async (squadId) => {
    try {
      // Send the GET request to the server
      const squad = await sendRequest(`${BASE_URL}/${squadId}`);
      // Clear the selected squad if the same squad is clicked twice
      if (selectedSquad && selectedSquad._id === squad._id) {
        setSelectedSquad(null);
        return;
      }
      // Set the selected squad in state
      setSelectedSquad(squad);

    } catch (error) {
      console.error('Error fetching squad:', error);
    }
  };
  
  
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 neon-green">Your Squads</h2>
      <ul>
        {userSquads.map((squad) => (
          <li key={squad._id} className="mb-2">
            <div
              className="flex items-center justify-between bg-gray-100 p-2 rounded cursor-pointer"
              onClick={() => handleSquadClick(squad._id)}
            >
              <span className="text-lg">{squad.name}</span>
              <button
                onClick={() => handleDeleteSquad(squad._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {/* Display squad details if selected */}
            {selectedSquad && selectedSquad._id === squad._id && (
              <div className="bg-gray-200 p-4 mt-2 rounded">
                <h3 className="text-lg font-bold mb-2">{selectedSquad.name} Characters</h3>
                <ul>
                  {selectedSquad.characters.map((character) => (
                    <li key={character._id} className="mb-1">
                      {character.name} - {character.class}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

};

export default SquadPage;
