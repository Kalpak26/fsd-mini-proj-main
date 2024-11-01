// backend/scripts/init-events.js
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/Event');

const sampleEvents = [
  {
    title: "John Derek Teaches Historical Course",
    startDate: "2024-03-14",
    endDate: "2024-03-20",
    time: "12:00 am",
    description: "Join us for an engaging historical course taught by John Derek.",
    registrationLink: "https://example.com/register"
  },
  {
    title: "Art in Motion",
    startDate: "2024-05-29",
    endDate: "2024-05-31",
    time: "12:00 am",
    description: "Experience art come to life in this dynamic exhibition.",
    registrationLink: "https://example.com/register"
  },
  {
    title: "Future Tech Summit",
    startDate: "2024-09-12",
    endDate: "2024-09-15",
    time: "9:00 am",
    description: "Join industry leaders and tech enthusiasts to discuss the future of technology and innovation.",
    registrationLink: "https://example.com/register"
  },
  {
    title: "International Film Week",
    startDate: "2024-10-10",
    endDate: "2024-10-17",
    time: "7:00 pm",
    description: "Celebrate world cinema with a week of international film screenings and discussions.",
    registrationLink: "https://example.com/register"
  },
  {
    title: "Sustainability Conference",
    startDate: "2024-11-05",
    endDate: "2024-11-07",
    time: "10:00 am",
    description: "A platform to discuss environmental challenges and sustainable solutions for a better future.",
    registrationLink: "https://example.com/register"
  },
  //Add more if req
];

const initializeEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Add new events
    const events = await Event.insertMany(sampleEvents);
    console.log('Added sample events:', events);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

initializeEvents();