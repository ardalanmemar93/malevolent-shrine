import React, { useState } from 'react';

const SquadForm = () => {
    const [name, setName] = useState('');
    const [characterSearch, setCharacterSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCharacters, setSelectedCharacters] = useState([]);

    const handleSearch = async () => {
        // Send a request to Jikan API to search for anime characters
        const response = await fetch(`https://api.jikan.moe/v3/search/character?q=${characterSearch}&limit=5`);
        const data = await response.json();

        setSearchResults(data.results);
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
        // Send a request to your backend to create a new squad
        const response = await fetch('/squads/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, characters: selectedCharacters /* other data */ }),
        });

        if (response.ok) {
            // Squad created successfully
            // Handle the response or redirect the user
        } else {
            // Handle error
            console.error('Error creating squad');
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
            {searchResults.length > 0 && (
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
            {selectedCharacters.length > 0 && (
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
