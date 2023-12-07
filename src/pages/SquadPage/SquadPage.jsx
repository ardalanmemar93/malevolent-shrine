import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';
import { animated, useSpring } from 'react-spring';

const SquadPage = () => {
  const [userSquads, setUserSquads] = useState([]);
  const [selectedSquad, setSelectedSquad] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = '/api/squads';

  const fetchSquads = async () => {
    try {
      const res = await sendRequest(BASE_URL);
      setUserSquads(res);
    } catch (error) {
      console.error('Error fetching user squads:', error);
    }
  };

  useEffect(() => {
    fetchSquads();
  }, []);

  const handleDeleteSquad = async (squadId) => {
    try {
      await sendRequest(`${BASE_URL}/${squadId}`, 'DELETE');
      setUserSquads(userSquads.filter((squad) => squad._id !== squadId));
    } catch (error) {
      console.error('Error deleting squad:', error);
    }
  };

  const handleSquadClick = async (squadId) => {
    try {
      const squad = await sendRequest(`${BASE_URL}/${squadId}`);
      if (selectedSquad && selectedSquad._id === squad._id) {
        setSelectedSquad(null);
        setSelectedCharacter(null);
        return;
      }
      setSelectedSquad(squad);
    } catch (error) {
      console.error('Error fetching squad:', error);
    }
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter((prevSelectedCharacter) => {
      if (prevSelectedCharacter && prevSelectedCharacter._id === character._id) {
        return null;
      }
      return character;
    });
  };

  const handleUpdateSquad = (squadId) => {
    navigate(`/update-squad/${squadId}`);
  };

  const aboutSpring = useSpring({
    from: { opacity: 0, height: 0 },
    to: { opacity: 1, height: 'auto' },
  });

  return (
    <div className="form-wrapper w-full  p-6 shadow-md rounded-md">
    <h2 className="text-2xl font-bold mb-4 neon-green">Your Squads</h2>
     <ul className="space-y-4">
  {userSquads.map((squad) => (
    <li key={squad._id} className="mb-2">
      <div
        className="flex items-center justify-between p-4 rounded cursor-pointer bg-neon-blue"
        onClick={() => handleSquadClick(squad._id)}
      >
        <span className="text-lg neon-blue">{squad.name}</span>

        <div className="space-x-2">
          <button
            onClick={() => handleUpdateSquad(squad._id)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteSquad(squad._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {selectedSquad && selectedSquad._id === squad._id && (
        <div className="p-4 mt-2 rounded bg-gray-200">
          <h3 className="text-lg font-bold mb-2 text-neon-white">{selectedSquad.name} Characters</h3>
          <ul className="space-y-4">
            {selectedSquad.characters.map((character) => (
              <li key={character._id} className="mb-4">
                <div className="flex items-center bg-teal-500 p-4 rounded">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="w-20 h-20 rounded-full mr-4 cursor-pointer"
                    onClick={() => handleCharacterClick(character)}
                  />
                  <div>
                    <p className="font-bold text-white">{character.name}</p>
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


  {selectedCharacter && (
    <div className="bg-gray-200 p-4 mt-2 rounded">
      <div className="flex items-center">
        <div className="w-1/3 mr-4">
          <img
            src={selectedCharacter.imageUrl}
            alt={selectedCharacter.name}
            className="w-full h-auto rounded-full cursor-pointer"
            onClick={() => handleCharacterClick(selectedCharacter)}
          />
        </div>
        <div className="w-2/3">
          <h3 className="text-lg font-bold mb-2">{selectedCharacter.name} Details</h3>
          <animated.div style={aboutSpring}>
            <p>{selectedCharacter.about}</p>
          </animated.div>
        </div>
      </div>
    </div>
  )}

    </div>
  );
};

export default SquadPage;
