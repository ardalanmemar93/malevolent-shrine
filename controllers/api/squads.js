const Squad = require('../../models/squad');
const Character = require('../../models/character');
const User = require('../../models/user');

module.exports = {
  createSquad,
};

async function createSquad(req, res) {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = req.user;
    const foundUser = await User.findById(user._id);
    console.log(user._id);
    const { characters, name } = req.body;
    
    const newCharacters = await Character.create(characters)

    // Create a new squad and associate it with the user
    const newSquad = await Squad.create({ user: user._id, name })

    // Update user's squads array
    foundUser.squads.push(newSquad._id);
    await foundUser.save();
    newSquad.characters.push(...newCharacters.map(c => c._id));
    await newSquad.save();

    res.status(201).json(newSquad);
  } catch (error) {
    console.error('Error creating squad:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
