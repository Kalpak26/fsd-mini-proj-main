// backend/scripts/init-db.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      // Create default admin user
      const adminUser = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123', // Will be hashed automatically
        role: 'admin'
      });

      await adminUser.save();
      console.log('Default admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the initialization
initializeDatabase();