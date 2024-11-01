// src/pages/HomePage.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ClubModal from './ClubModal';
import './HomePage.css';
import './Slideshow.css';

// Custom Hook for Slideshow Logic
const useSlideshow = (slidesCount) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [slidesCount, isDragging]);

  // Mouse event handlers for slideshow
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    if (e.clientX - startX > 50) {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + slidesCount) % slidesCount);
      setIsDragging(false);
    } else if (startX - e.clientX > 50) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesCount);
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    currentSlide,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

const HomePage = () => {
  // State management for clubs
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  // State management for events
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  // Slideshow configuration
  const slidesCount = 3;
  const {
    currentSlide,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useSlideshow(slidesCount);

  // Fetch clubs from backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clubs');
        setClubs(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError('Failed to load clubs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
        setEventsError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setEventsError('Failed to load events');
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  // Modal handlers
  const openModal = (club) => {
    setSelectedClub(club);
    setShowModal(true);
  };

  // Fallback data for events if API fails
  const fallbackEvents = [
    {
      date: "Mar 14 – Mar 20",
      title: "John Derek Teaches Historical Course",
      time: "12:00 am"
    },
    {
      date: "May 29 – May 31",
      title: "Art in Motion",
      time: "12:00 am"
    },
    {
      date: "Aug 01 – Aug 09",
      title: "Chinese Chair Culture Group Meeting",
      time: "12:00 am"
    },
    {
      date: "Aug 16 – Aug 21",
      title: "GreenWorks Trashion Show",
      time: "12:00 am"
    }
  ];

  // Fallback clubs data if API fails
  const fallbackClubs = [
    {
      name: "GDSC",
      heads: "John Doe",
      contact: "john@example.com",
      description: "Google Developer Student Clubs is a program for university students to learn, connect, and grow together with like minder people.",
      registrationLink: "https://gdsc.com",
      image: "./src/assets/club1.jpg"
    },
    {
      name: "CSI",
      heads: "Jane Smith",
      contact: "jane@example.com",
      description: "The Computer Society of India works on fostering knowledge in computer science and its related fields.",
      registrationLink: "https://csi.com",  
      image: "./src/assets/club2.jpg"
    },
    {
      name: "Cosmos",
      heads: "Jarivs Stark",
      contact: "jarvis@example.com",
      description: "Express your creativity and work on collaborative projects with peers.",
      registrationLink: "https://cosmos.com",
      image: "./src/assets/club3.jpg"
    }
  ];

  // Format date for events display
  const formatEventDate = (startDate, endDate) => {
    const options = { month: 'short', day: 'numeric' };
    const start = new Date(startDate).toLocaleDateString('en-US', options);
    const end = new Date(endDate).toLocaleDateString('en-US', options);
    return `${start} – ${end}`;
  };

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Slideshow Section */}
      <section
        className="hero-slideshow"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="slideshow-container">
          {[1, 2, 3].map((num) => (
            <div 
              key={num}
              className={`slide fade ${currentSlide === num - 1 ? 'active' : ''}`}
            >
              <img src={`./src/assets/slide${num}.jpg`} alt={`Slide ${num}`} />
            </div>
          ))}

          {/* Slideshow Navigation Dots */}
          <div className="dots-container">
            {[0, 1, 2].map((num) => (
              <span
                key={num}
                className={`dot ${currentSlide === num ? 'filled' : 'hollow'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        {loadingEvents ? (
          <div className="loading">Loading events...</div>
        ) : eventsError ? (
          <div className="error">{eventsError}</div>
        ) : (
          <div className="events-list">
            {(events.length > 0 ? events : fallbackEvents).map((event, index) => (
              <div className="event-item" key={event._id || index}>
                <div className="event-date">
                  <p>{event.startDate && event.endDate 
                      ? formatEventDate(event.startDate, event.endDate)
                      : event.date}</p>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                </div>
                <div className="event-time">
                  <p>{event.time}</p>
                </div>
                <div className="event-link">
                  {event.registrationLink ? (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      Details
                    </a>
                  ) : (
                    <a href="#">Details</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Clubs Section */}
      <section className="clubs-section">
        <h2>Featured Clubs</h2>
        {loading ? (
          <div className="loading">Loading clubs...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="clubs-grid">
            {(clubs.length > 0 ? clubs : fallbackClubs).map((club) => (
              <div className="club-card" key={club._id || club.name}>
                <img 
                  src={club.image} 
                  alt={club.name}
                  onError={(e) => {
                    e.target.src = "./src/assets/club1.jpg";
                  }}
                />
                <h3>{club.name}</h3>
                <p>{club.description.substring(0, 50)}...</p>
                <button onClick={() => openModal(club)} className="more-info">
                  <i className="fa fa-chevron-down"></i> More Info
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Club Details Modal */}
        <ClubModal 
          showModal={showModal} 
          setShowModal={setShowModal} 
          clubData={selectedClub} 
        />
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Students Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"Joining the Robotics Club was the best decision I made in college. The hands-on experience is invaluable!"</p>
            <span>- Alex D.</span>
          </div>
          <div className="testimonial">
            <p>"The Art & Craft Club helped me discover my passion for design, and I made some great friends along the way!"</p>
            <span>- Maya S.</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          {/* Contact Information */}
          <div className="footer-col">
            <h3>MIT World Peace University</h3>
            <p>
              Kothrud, Pune 411038<br />
              Maharashtra, India<br />
              Phone: +91 20 7117 7104<br />
              Email: info@mitwpu.edu.in<br />
              Monday – Thursday, 8:00 am – 6:00 pm
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3>Useful Links</h3>
            <ul>
              <li><a href="#">Academics</a></li>
              <li><a href="#">Student Life</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Research</a></li>
            </ul>
          </div>

          {/* Campus Information */}
          <div className="footer-col">
            <h3>Campus Today</h3>
            <ul>
              <li><a href="#">Life & Events</a></li>
              <li><a href="#">Housing</a></li>
              <li><a href="#">Dining</a></li>
              <li><a href="#">Athletics & Recreation</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="footer-col">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.instagram.com/mitwpu" target="_blank" rel="noopener noreferrer">
                <img src="./src/assets/instagram-icon.png" alt="Instagram" />
              </a>
              <a href="https://twitter.com/mitwpu" target="_blank" rel="noopener noreferrer">
                <img src="./src/assets/twitter-icon.png" alt="Twitter" />
              </a>
              <a href="https://www.youtube.com/@MITWorldPeaceUniversity" target="_blank" rel="noopener noreferrer">
                <img src="./src/assets/youtube-icon.png" alt="YouTube" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="footer-bottom">
          <p>
            One of the largest, most diverse universities in India with over 40,000 students.<br />
            © 2023 MITWPU. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;