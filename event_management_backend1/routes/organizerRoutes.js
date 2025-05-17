const express = require('express');
const router = express.Router();
const { registerOrganizer, getAllOrganizers } = require('../controllers/organizerController');

// Routes
router.post('/register', registerOrganizer);
router.get('/', getAllOrganizers);

module.exports = router;
