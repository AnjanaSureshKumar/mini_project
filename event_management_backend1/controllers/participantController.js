const Participant = require('../models/Participant');
const Event = require('../models/Event');

// Register a new participant with selected events
exports.registerParticipant = async (req, res) => {
  try {
    const { name, email, usn, college, eventsRegistered } = req.body; // Expecting eventsRegistered as an array of event IDs

    const newParticipant = new Participant({
      name,
      email,
      usn,
      college,
      eventsRegistered, // Save the array of event IDs
    });

    await newParticipant.save();

    res.status(201).json({ message: 'Participant registered successfully', participant: newParticipant });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Register an existing participant for additional events
exports.registerForEvent = async (req, res) => {
  const { participantId, eventId } = req.body;

  try {
    const participant = await Participant.findById(participantId);
    const event = await Event.findById(eventId);

    if (!participant || !event) {
      return res.status(404).json({ message: 'Participant or Event not found' });
    }

    if (participant.eventsRegistered.includes(eventId)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    participant.eventsRegistered.push(eventId);
    await participant.save();

    res.json({ message: 'Successfully registered for event', participant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all participants
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate('eventsRegistered');
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
