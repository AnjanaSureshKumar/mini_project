const express = require('express');
const router = express.Router();
const {
  registerParticipant,
  getAllParticipants,
  registerForEvent,
} = require('../controllers/participantController');

router.get('/', getAllParticipants);
router.post('/register', registerParticipant);
router.post('/registerForEvent', registerForEvent);

module.exports = router;
