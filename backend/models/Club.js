// backend/models/Club.js
const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Club name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Club description is required'],
    trim: true
  },
  heads: {
    type: String,
    required: [true, 'Club heads are required'],
    trim: true
  },
  contact: {
    type: String,
    required: [true, 'Contact information is required'],
    trim: true
  },
  registrationLink: {
    type: String,
    trim: true
  },
  instagramLink: {
    type: String
  },
  image: {
    type: String,
    default: 'default-club-image.jpg'
  },
  events: [{
    title: String,
    date: Date,
    description: String
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Club', clubSchema);