// backend/scripts/import-clubs.js
require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parse');
const mongoose = require('mongoose');
const Club = require('../models/Club');

const importClubs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const fileContent = fs.readFileSync('clubs.csv', 'utf-8');
    
    csv.parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    }, async (error, records) => {
      if (error) {
        console.error('Error parsing CSV:', error);
        return;
      }

      try {
        await Club.deleteMany({});
        console.log('Cleared existing clubs');

        const clubs = records.map((record, index) => ({
          name: record['Club Name'],
          description: record['Club Description'],
          heads: record['Head/President'] || record['Contact Person'] || 'Contact club for details',
          contact: record['Contact number 1'] || record['Contact Person'] || 'Contact through Instagram',
          registrationLink: `https://forms.google.com/${record['Club Name'].toLowerCase().replace(/\s+/g, '')}-registration`,
          instagramLink: record['Instagram Link'],
          image: `./src/assets/club${(index % 3) + 1}.jpg` // Keeping exact same path as frontend
        }));

        await Club.insertMany(clubs);
        console.log(`Successfully imported ${clubs.length} clubs`);

      } catch (err) {
        console.error('Error importing clubs:', err);
      } finally {
        mongoose.connection.close();
      }
    });

  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

importClubs();