const express = require('express');
const router = express.Router();
const squadsController = require('../../controllers/api/squads');
const jwt = require('jsonwebtoken');

// Logging middleware to check if the request has a valid token
router.post('/create', async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
      // Verify the token using the correct secret
      const decoded = jwt.verify(token, process.env.SECRET);

      if (decoded) {
        // Attach user information to the request
        req.user = decoded.user;
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}, squadsController.createSquad);


// route to fetch user squads
router.get('/', squadsController.index);

// Route to delete a squad
router.delete('/:squadId', squadsController.deleteSquad);

// route to fetch squad details by squad ID
router.get('/:squadId', squadsController.getSquadDetails);





module.exports = router;
