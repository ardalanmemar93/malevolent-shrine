import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';



const SquadPage = () => {
  const [userSquads, setUserSquads] = useState([]);
  const [selectedSquad, setSelectedSquad] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const navigate = useNavigate();

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

  const handleCharacterClick = (character) => {
    // Toggle the visibility of the selected character when it is clicked
    setSelectedCharacter((prevSelectedCharacter) => {
      if (prevSelectedCharacter && prevSelectedCharacter._id === character._id) {
        return null; // Hide the details if the same character is clicked again
      }
      return character; // Show the details if a different character is clicked
    });
  };
  


  const handleUpdateSquad = (squadId) => {
    // Navigate to the squad form for updating
    navigate(`/update-squad/${squadId}`);
  };
  


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 neon-green">Your Squads</h2>
      <ul>
        {userSquads.map((squad) => (
          <li key={squad._id} className="mb-2">
            <div
              className="flex items-center justify-between neon-blue p-2 rounded cursor-pointer"
              onClick={() => handleSquadClick(squad._id)}
            >
              <span className="text-lg">{squad.name}</span>

              <button
                onClick={() => handleUpdateSquad(squad._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteSquad(squad._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {/* Display squad details if selected */}
            {selectedSquad && selectedSquad._id === squad._id && (
              <div className=" p-4 mt-2 rounded">
                <h3 className="text-lg font-bold mb-2 neon-white">{selectedSquad.name} Characters</h3>
                <ul>
                  {selectedSquad.characters.map((character) => (
                    <li key={character._id} className="mb-4">
                      <div className="flex items-center bg-teal-500">
                        <img
                          src={character.imageUrl}
                          alt={character.name}
                          className="w-14 h-14 rounded-full mr-4"
                          onClick={() => handleCharacterClick(character)}
                          // Add an onClick handler to show character details
                        />
                        <div>
                          <p className="font-bold">{character.name}</p>
                          <p className="text-gray-600">{character.nameKanji}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Display selected character details */}
      {selectedCharacter && (
        <div className="bg-gray-200 p-4 mt-2 rounded">
          <h3 className="text-lg font-bold mb-2">{selectedCharacter.name} Details</h3>
          <p>{selectedCharacter.about}</p>
          {/* Add other character details you want to display */}
        </div>
      )}
    </div>
  );
};

export default SquadPage;
