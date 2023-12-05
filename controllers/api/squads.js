// const Squad = require('../../models/squad');
// const Character = require('../../models/character');
// const User = require('../../models/user');

// module.exports = {
//   createSquad,
// };

// async function createSquad(req, res) {
//   try {
//     // Check if user is authenticated
//     if (!req.user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Get the user from the database
//     const user = req.user;
//     // Find the user in the database
//     const foundUser = await User.findById(user._id);
//     // Get the characters from the request body
//     const { characters, name } = req.body;
//     // Create the characters and save them to the database
//     const newCharacters = await Character.create(characters)

//     // Create a new squad and associate it with the user
//     const newSquad = await Squad.create({ user: user._id, name })

//     // Update user's squads array
//     foundUser.squads.push(newSquad._id);
//     // Save the user
//     await foundUser.save();
//     // Update squad's characters array
//     newSquad.characters.push(...newCharacters.map(c => c._id));
//     // Save the squad
//     await newSquad.save();

//     res.status(201).json(newSquad);
//   } catch (error) {
//     console.error('Error creating squad:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }




const Squad = require('../../models/squad');
const Character = require('../../models/character');
const User = require('../../models/user');

module.exports = {
  createSquad,
  getUserSquads,
};

async function createSquad(req, res) {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get the user from the database
    const user = req.user;
    // Find the user in the database
    const foundUser = await User.findById(user._id);
    // Get the characters and squad name from the request body
    const { characters, name } = req.body;

    // Check if the request includes a squad ID
    if (req.body.squadId) {
      // Edit existing squad

      // Find the squad in the database
      const squadToUpdate = await Squad.findById(req.body.squadId);

      // Check if the squad exists and belongs to the user
      if (!squadToUpdate || squadToUpdate.user.toString() !== user._id.toString()) {
        return res.status(404).json({ error: 'Squad not found or unauthorized' });
      }

      // Update squad's name
      squadToUpdate.name = name;

      // Remove existing characters from the squad
      squadToUpdate.characters = [];

      // Create new characters and save them to the database
      const newCharacters = await Character.create(characters);

      // Update squad's characters array
      squadToUpdate.characters.push(...newCharacters.map(c => c._id));

      // Save the updated squad
      await squadToUpdate.save();

      res.status(200).json(squadToUpdate);
    } else {
      // Create new squad

      // Create the characters and save them to the database
      const newCharacters = await Character.create(characters);

      // Create a new squad and associate it with the user
      const newSquad = await Squad.create({ user: user._id, name });

      // Update user's squads array
      foundUser.squads.push(newSquad._id);

      // Save the user
      await foundUser.save();

      // Update squad's characters array
      newSquad.characters.push(...newCharacters.map(c => c._id));

      // Save the squad
      await newSquad.save();

      res.status(201).json(newSquad);
    }
  } catch (error) {
    console.error('Error creating/editing squad:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getUserSquads(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Get the user from the database
      const user = req.user;
  
      // Find the user in the database and populate the squads field
      const foundUser = await User.findById(user._id).populate('squads');
  
      // Send the user's squads in the response
      res.status(200).json(foundUser.squads);
    } catch (error) {
      console.error('Error fetching user squads:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
