const Character = require('../../models/character');
const Squad = require('../../models/squad');
const User = require('../../models/user');

module.exports = {
  createSquad,
  getUserSquads,
  index,
  deleteSquad,
  getSquadDetails
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

      res.status(201).json({ newSquad, charactersAdded: true });
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
      const foundUser = await User.findById(user._id).populate('squads');//.populate('user.squads');
  
      // Send the user's squads in the response
      res.status(200).json(foundUser.squads);
    } catch (error) {
      console.error('Error fetching user squads:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

//index function to get all squads
  async function index(req, res) {
    try {
      const squads = await Squad.find({});
      res.status(200).json(squads);
    } catch (error) {
      console.error('Error fetching squads:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  //delete function to delete a squad
  async function deleteSquad(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Get the user from the database
      const user = req.user;
      // Find the user in the database
      const foundUser = await User.findById(user._id);
  
      // Check if the request includes a squad ID
      const squadId = req.params.squadId;
      if (!squadId) {
        return res.status(400).json({ error: 'Squad ID is required' });
      }
  
      // Find the squad in the database
      const squadToDelete = await Squad.findById(squadId);
  
      // Check if the squad exists and belongs to the user
      if (!squadToDelete || squadToDelete.user.toString() !== user._id.toString()) {
        return res.status(404).json({ error: 'Squad not found or unauthorized' });
      }
  
      // Remove squad from user's squads array
      foundUser.squads = foundUser.squads.filter((squad) => squad.toString() !== squadId);
      
      // Remove squad from the database
      await Squad.findByIdAndRemove(squadId);
  
      // Save the user
      await foundUser.save();
  
      res.status(200).json({ success: true, message: 'Squad deleted successfully' });
    } catch (error) {
      console.error('Error deleting squad:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  //squad details function
  async function getSquadDetails(req, res) {
      try {
          const squadId = req.params.squadId;
  
          // Retrieve squad details from the database
          const squadDetails = await Squad.findById(squadId)
              .populate('characters'); 
  
          // Check if the squad exists
          if (!squadDetails) {
              return res.status(404).json({ error: 'Squad not found' });
          }
  
          // Send the squad details as JSON response
          res.status(200).json(squadDetails);
      } catch (error) {
          console.error('Error fetching squad details:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }
  
