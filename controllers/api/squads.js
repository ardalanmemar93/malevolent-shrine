const Squad = require('../../models/squad');

module.exports = {
  createSquad,
};

async function createSquad(req, res) {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('req.user:', req.user);
    const user = req.user;

    const { characters, name } = req.body;

    // Create a new squad and associate it with the user
    const newSquad = await Squad.create({ user: user._id, characters, name });

    // Update user's squads array
    user.squads.push(newSquad._id);
    await user.save();

    res.status(201).json(newSquad);
  } catch (error) {
    console.error('Error creating squad:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
