const Squad = require('../../models/squad');

module.exports = {
    createSquad 
  };

async function createSquad(req, res) {
    // Create a new squad
    try {
        const { user, characters, name } = req.body;
        const newSquad = await Squad.create({ user, characters, name });
        res.status(201).json(newSquad);
    } catch (error) {
        console.error('Error creating squad:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

