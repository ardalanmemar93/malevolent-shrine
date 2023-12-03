import React, { useState } from 'react';
import getCharacter from '../../utilities/jikan-api';

const SquadForm = () => {
  const [name, setName] = useState('');
  const [characterSearch, setCharacterSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleSearch = async () => {
    try {
      // Send a request to Jikan API to search for anime characters
      const response = await fetch(`https://api.jikan.moe/v4/characters/?q=${characterSearch}`);
      const data = await response.json();
  
      // Ensure that data.results is an array before using map
      const characterIds = Array.isArray(data.results) ? data.results.map(result => result.mal_id) : [];
  
      // Fetch detailed character data using getCharacter function
      const detailedCharacterData = await Promise.all(characterIds.map(id => getCharacter(id)));
  
      // Set the search results with detailed character data
      setSearchResults(detailedCharacterData);
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
      // Send a request to your backend to create a new squad
      const response = await fetch('/api/squads/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, characters: selectedCharacters /* other data */ }),
      });

      if (response.ok) {
        // Squad created successfully
        // Handle the response or redirect the user
        const squadData = await response.json();
        console.log('Squad created successfully:', squadData);
      } else {
        // Handle error
        const errorData = await response.json();
        console.error('Error creating squad:', errorData);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  // Render your form
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Squad Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="characterSearch">Search for Anime Character:</label>
        <input
          type="text"
          id="characterSearch"
          value={characterSearch}
          onChange={(e) => setCharacterSearch(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Display search results */}
      {searchResults && searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.mal_id}>
                {result.name}{' '}
                <button type="button" onClick={() => handleAddCharacter(result)}>
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display selected characters */}
      {selectedCharacters && selectedCharacters.length > 0 && (
        <div>
          <h3>Selected Characters:</h3>
          <ul>
            {selectedCharacters.map((character) => (
              <li key={character.mal_id}>
                {character.name}{' '}
                <button type="button" onClick={() => handleRemoveCharacter(character)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit">Create Squad</button>
    </form>
  );
};

export default SquadForm;
