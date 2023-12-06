import React, { useState, useEffect} from 'react';
import getCharacter,{ searchCharacters } from '../../utilities/jikan-api';
import { getToken } from '../../utilities/users-service';
import { useParams } from 'react-router-dom';



const SquadUpdateForm = () => {
  const [name, setName] = useState('');
  const [characterSearch, setCharacterSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [squadCharacters, setSquadCharacters] = useState([]);
  const { squadId } = useParams();



  useEffect(() => {
    // Fetch squad details including characters when squadId changes
    const fetchSquadDetails = async () => {
      try {
        if (squadId) {
          const response = await fetch(`/api/squads/${squadId}`);
          if (response.ok) {
            const squadData = await response.json();
            setSquadCharacters(squadData.characters);
            setName(squadData.name);
          } else {
            console.error('Error fetching squad details:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching squad details:', error);
      }
    };

    fetchSquadDetails();
  }, [squadId]);


  
  const handleSearch = async () => {
    try {
      const data = await searchCharacters(characterSearch);
      // Ensure that data.data is an array before using map
      const characterIds = Array.isArray(data.data) ? data.data.map(result => result.mal_id) : [];
      // Fetch detailed character data using getCharacter function for the top five results
      const topFiveCharacterData = await Promise.all(characterIds.slice(0, 5).map(async id => {
        try {
          return await getCharacter(id);
        } catch (error) {
          return null;
        }
      }));
      // Filter out null values (characters not found)
      const filteredCharacterData = topFiveCharacterData.filter(character => character !== null);
      // Set the search results with the detailed character data
      setSearchResults(filteredCharacterData);
    } catch (error) {
      console.error('Error searching for characters:', error);
    }
  };
  
  const handleAddCharacter = (character) => {
    // Add the selected character to the list of selected characters
    setSelectedCharacters([...selectedCharacters, character]);
    // Clear the search results
    setSearchResults([]);
    // Clear the character search input
    setCharacterSearch('');
  };

  const handleRemoveCharacter = (character) => {
    // Remove the selected character from the list
    const updatedCharacters = selectedCharacters.filter((c) => c !== character);
    setSelectedCharacters(updatedCharacters);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // the update URL
      const apiUrl = `/api/squads/${squadId}`;
      // Send a request to the backend to update the squad
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name, characters: selectedCharacters }),
      });
      if (response.ok) {
        // Handle the response or redirect the user
        const responseData = await response.json();
        console.log('Squad updated successfully:', responseData);
        // Handle other responses as needed
      } else {
        // Handle error
        const errorData = await response.json();
        console.error('Error updating squad:', errorData);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  
  

  const handleRemoveCharacterFromSquad = (characterId) => {
    // Remove the selected character from the squad
    const updatedSquadCharacters = squadCharacters.filter((c) => c._id !== characterId);
    setSquadCharacters(updatedSquadCharacters);
  };
  
  
  
  // Render your form
  return (
    <form onSubmit={handleSubmit} className=" max-w-md mx-auto mt-8 p-4  shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="name" className="block  text-sm font-bold mb-2 neon">
          Squad Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="characterSearch" className="block text-sm font-bold mb-2 neon">
          Search for Anime Character:
        </label>
        <div className="flex">
          <input
            type="text"
            id="characterSearch"
            value={characterSearch}
            onChange={(e) => setCharacterSearch(e.target.value)}
            className=" px-3 py-2 border rounded-l focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>



       {/* Display squad characters */}
       {squadCharacters && squadCharacters.length > 0 && (
        <div>
          <h3 className="text-xl neon font-bold mb-2">Characters in Squad:</h3>
          <ul className="space-y-4">
            {squadCharacters.map((character) => (
              <li
                key={character._id}
                className="bg-transparent p-3 border border-gray-300 rounded-md flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img src={character.imageUrl} alt={character.name} className="w-14 h-14 rounded-full mr-4" />
                  <span className="neon-green font-semibold">{character.name}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveCharacterFromSquad(character._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchResults && searchResults.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-2">Search Results:</h3>
          <ul className="space-y-4">
            {searchResults.map((result) => (
              <li
                key={result.mal_id}
                className="w-full bg-transparent p-3 border border-gray-300 rounded-md flex items-center justify-between"
              >
                <div className="flex items-center">
                  {result.imageUrl && (
                    <img src={result.imageUrl} alt={result.name} className="w-12 h-12 rounded-full mr-4" />
                  )}
                  <span className="text-gray-800 font-semibold neon-green">{result.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddCharacter(result)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}


            {/* Display selected characters before adding to the squad */}
            {selectedCharacters && selectedCharacters.length > 0 && (
        <div>
            <h3 className="text-xl neon font-bold mb-2">Characters to Add to Squad:</h3>
            <ul className="space-y-4">
            {selectedCharacters.map((character) => (
                <li
                key={character.mal_id}
                className="bg-transparent p-3 border border-gray-300 rounded-md flex items-center justify-between"
                >
                <div className="flex items-center">
                    <img src={character.imageUrl} alt={character.name} className="w-14 h-14 rounded-full mr-4" />
                    <span className="neon-green font-semibold">{character.name}</span>
                </div>
                
                <button
                    type="button"
                    onClick={() => handleRemoveCharacter(character)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Remove
                </button>
                </li>
            ))}
            </ul>
        </div>
        )}



  <button type="submit" className="neon">
              Update Squad
  </button>

    </form>
  );
};


export default SquadUpdateForm;






