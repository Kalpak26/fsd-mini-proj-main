// backend/test-connection.js
const mongoose = require('mongoose');
require('dotenv').config();

// Function to test MongoDB connection
async function testConnection() {
  try {
    // Connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB!');

    // Create a simple test schema
    const TestSchema = new mongoose.Schema({
      name: String,
      date: { type: Date, default: Date.now }
    });
    
    // Create model
    const Test = mongoose.model('Test', TestSchema);

    // Try to create a document
    console.log('Testing database operations...');
    const testDoc = new Test({ name: 'test_document' });
    await testDoc.save();
    console.log('Successfully created test document!');

    // Try to read the document
    const found = await Test.findOne({ name: 'test_document' });
    console.log('Successfully read test document:', found);

    // Clean up - delete the test document
    await Test.deleteOne({ name: 'test_document' });
    console.log('Successfully deleted test document');

    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed successfully');
    
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
}

// Run the test
testConnection()
  .then(success => {
    if (success) {
      console.log('All connection tests passed successfully!');
    } else {
      console.log('Connection test failed!');
    }
    process.exit();
  });