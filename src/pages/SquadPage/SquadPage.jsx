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
    <div className="form-wrapper w-full p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 neon-green">Squads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userSquads.map((squad) => (
          <div key={squad._id} className="mb-6">
            <div
              className="flex flex-col p-4 rounded cursor-pointer text-white"
              onClick={() => handleSquadClick(squad._id)}
            >
              <span className="text-xl font-semibold neon-blue">{squad.name}</span>
            </div>
  
            {selectedSquad && selectedSquad._id === squad._id && (
              <div className="p-4 mt-2 rounded ">
                <h3 className="text-lg font-bold mb-2 neon-purple">{selectedSquad.name} Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSquad.characters.map((character) => (
                    <div key={character._id} className="mb-4">
                      <div className="flex items-center bg-teal-500 p-4 rounded text-white">
                        <img
                          src={character.imageUrl}
                          alt={character.name}
                          className="w-20 h-20 rounded-full mr-4 cursor-pointer"
                          onClick={() => handleCharacterClick(character)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
  
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => handleUpdateSquad(squad._id)}
                    className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-3 py-1 rounded hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-sm transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteSquad(squad._id)}
                    className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-3 py-1 rounded hover:from-red-700 hover:via-red-800 hover:to-red-900 text-sm transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
  
      {selectedCharacter && (
        <div className="grid grid-cols-1 mt-6">
          <div className="bg-gray-200 p-4 rounded">
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
                <div className="flex flex-col mb-4">
                  <h3 className="text-lg font-bold">{selectedCharacter.name}</h3>
                  <p className="text-gray-600">{selectedCharacter.nameKanji}</p>
                </div>
                <div className="mb-2">
                  <p className="text-gray-800">{selectedCharacter.about}</p>
                </div>
                <animated.div style={aboutSpring}>
                  {/* Additional content if needed */}
                </animated.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
      };

export default SquadPage;
