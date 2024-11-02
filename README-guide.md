# College Clubs Website

A full-stack web application for managing college clubs, events, and activities. Built with React, Node.js, Express, and MongoDB.

## Features

- 🏫 Club listings with detailed information
- 📅 Event management system
- 👤 Admin dashboard for content management
- 🔐 Authentication system
- 📱 Responsive design

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/downloads)

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/Kalpak26/fsd-mini-proj-main
cd college-clubs-website
```

2. **Set up the backend**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

3. **Configure environment variables**
Edit the `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. **Set up the frontend**
```bash
# Navigate to frontend directory
cd ../vite-project

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

## Database Setup

1. Create a MongoDB Atlas account or use local MongoDB
2. Create a new cluster (if using Atlas)
3. Get your connection string
4. Add connection string to backend `.env` file

## Data Initialization

### Setting up Initial Data

1. **Prepare CSV Files**
Place your clubs.csv file in the `backend` directory: (a sample clubs.csv is already present)
```
backend/
├── clubs.csv
└── scripts/
    ├── import-clubs.js
    └── import-events.js
```

2. **Install Required Dependencies**
```bash
cd backend
npm install csv-parse
```

3. **Run Initialization Scripts**
```bash
# Make sure you're in the backend directory
cd backend

# Import clubs from CSV
node scripts/import-clubs.js

# Import sample events
node scripts/import-events.js
```

5. **Verify Data Import**
You can verify the data import using MongoDB Compass or the MongoDB Atlas web interface.


## Running the Application

1. **Start the backend server**
```bash
cd backend
npm start
```

2. **Start the frontend development server**
```bash
cd vite-project
npm run dev
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
college-clubs-website/
├── backend/
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── server.js       # Main server file
│
└── vite-project/
    ├── src/
    │   ├── components/ # React components
    │   ├── pages/      # Page components
    │   ├── assets/     # Static assets
    │   └── styles/     # CSS files
    └── index.html
```

## Key Features & Usage

1. **Public Features**
   - View all clubs
   - Browse upcoming events
   - View club details
   - Register for events

2. **Admin Features**
   - Manage clubs (add, edit, delete)
   - Manage events
   - User management
   - Content moderation

## Admin Access

To access admin features:
1. Register a new account
2. Use the default admin credentials:
   - Email: admin@example.com
   - Password: admin123

## Common Issues & Solutions

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in .env file
   - Ensure network connectivity

2. **Missing Assets**
   - Check if images are in correct directory
   - Verify file paths in components

3. **Authentication Issues**
   - Clear browser cache
   - Check token expiration
   - Verify credentials

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---
Remember to replace placeholder values with your actual project information before publishing.
