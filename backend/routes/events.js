// backend/routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { auth, adminOnly } = require('../middleware/authMiddleware');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ startDate: 1 }) // Sort by date ascending
      .exec();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new event (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      time: req.body.time,
      description: req.body.description,
      registrationLink: req.body.registrationLink
    });
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update event (admin only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    Object.assign(event, req.body);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete event (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;