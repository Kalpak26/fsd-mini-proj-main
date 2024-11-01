// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token middleware
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('No token provided');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Add user to request object
    req.user = user;
    req.userId = user._id;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Check if user is admin
const adminOnly = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      throw new Error('Admin access required');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = { auth, adminOnly };