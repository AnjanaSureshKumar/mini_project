const mongoose = require('mongoose');

const OrganizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  usn: { type: String, required: true },
  college: { type: String, required: true },
  eventsManaged: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('Organizer', OrganizerSchema);
