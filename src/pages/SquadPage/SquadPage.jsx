import React, { useEffect, useState } from 'react';

const SquadPage = ({ user }) => {
  const [userSquads, setUserSquads] = useState([]);

  useEffect(() => {
    const fetchUserSquads = async () => {
      try {
        const response = await fetch('/api/squads/user-squads', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const squads = await response.json();
          setUserSquads(squads);
        } else {
          console.error('Error fetching user squads:', await response.json());
        }
      } catch (error) {
        console.error('Error fetching user squads:', error);
      }
    };

    if (user) {
      fetchUserSquads();
    }
  }, [user]);

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
