const bcrypt = require('bcryptjs');
const Organizer = require('../models/Organizer');

// Register Organizer
exports.registerOrganizer = async (req, res) => {
  try {
    const { name, email, contact, password, usn, college, eventsManaged } = req.body;

    console.log("Incoming request body:", req.body);

    if (
      !name || !email || !contact || !password ||
      !usn || !college || !eventsManaged || eventsManaged.length === 0
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organizer = await Organizer.create({
      name,
      email,
      contact,
      password: hashedPassword,
      usn,
      college,
      eventsManaged: Array.isArray(eventsManaged) ? eventsManaged : [eventsManaged]
    });

    res.status(201).json(organizer);
  } catch (err) {
    console.error("Error during organizer registration:", err);
    res.status(400).json({ error: err.message });
  }
};

// Get all organizers
exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find().populate('eventsManaged');
    res.json(organizers);
  } catch (err) {
    console.error('Error fetching organizers:', err);
    res.status(500).json({ error: err.message });
  }
};
