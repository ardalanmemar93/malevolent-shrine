const express = require('express');
const router = express.Router();
const squadsController = require('../../controllers/api/squads');

// route to fetch user squads
router.get('/', squadsController.getUserSquads);


module.exports = router;
