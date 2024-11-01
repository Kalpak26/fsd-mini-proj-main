// backend/routes/clubs.js
const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const { auth, adminOnly } = require('../middleware/authMiddleware');

// Public route - Get all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected routes - Only admin can create, update, delete clubs
// Create a new club
router.post('/', auth, adminOnly, async (req, res) => {
  const club = new Club({
    name: req.body.name,
    description: req.body.description,
    heads: req.body.heads,
    contact: req.body.contact,
    registrationLink: req.body.registrationLink
  });

  try {
    const newClub = await club.save();
    res.status(201).json(newClub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a club
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (club) {
      Object.assign(club, req.body);
      const updatedClub = await club.save();
      res.json(updatedClub);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a club
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (club) {
      await club.deleteOne(); // Using deleteOne() instead of remove()
      res.json({ message: 'Club deleted' });
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;