const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  usn: { type: String, required: true },
  college: { type: String, required: true },
  eventsRegistered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

// Compound index to ensure that the same USN cannot be registered for the same event multiple times
participantSchema.index({ usn: 1, 'eventsRegistered': 1 }, { unique: false });

module.exports = mongoose.model('Participant', participantSchema);
