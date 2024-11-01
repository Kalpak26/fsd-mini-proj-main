// backend/scripts/verify-user.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function verifyUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all users
    const users = await User.find({});
    console.log('\nAll users in database:');
    console.log(users);

    // Find admin specifically
    const admin = await User.findOne({ role: 'admin' });
    console.log('\nAdmin user:');
    console.log(admin);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

verifyUser();