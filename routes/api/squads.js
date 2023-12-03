const express = require('express');
const router = express.Router();
const squadsController = require('../../controllers/api/squads');

router.post('/create', squadsController.createSquad);
// Add other routes for read, update, delete

module.exports = router;
