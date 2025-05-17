const mongoose = require('mongoose');

// Replace with the path to your Participant model file
const Participant = require('./models/Participant');  // Adjust the path as needed

async function dropEmailIndex() {
  try {
    // Replace with your actual MongoDB connection string
    await mongoose.connect('mongodb://localhost:27017/eventDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const participantModel = mongoose.model('Participant');

    // Drop the index for the email field
    await participantModel.collection.dropIndex('email_1');

    console.log('Email index dropped successfully');
    
    // Close the connection after dropping the index
    mongoose.connection.close();
  } catch (error) {
    console.error('Error dropping the email index:', error);
    mongoose.connection.close();
  }
}

// Call the function to drop the index
dropEmailIndex();
