/*.src/pages/HomePage.jsx*/

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ClubModal from './ClubModal'; // Import the modal
import './HomePage.css'; // Importing CSS for page styling
import './Slideshow.css'; // Slideshow-specific CSS

const clubs = [
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
  // Add more clubs here
];

// Custom Hook for Slideshow Logic with Mouse Drag Functionality
const useSlideshow = (slidesCount) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Automatically transition to the next slide every 3 seconds
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesCount);
    }, 3000); // 3 seconds per slide

    return () => clearInterval(interval);
  }, [slidesCount, isDragging]);

  // Function to handle mouse drag
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
  const slidesCount = 3; // Number of slides in the slideshow
  const {
    currentSlide,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useSlideshow(slidesCount);

  /*Portal modal for pop up*/
  const [showModal, setShowModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const openModal = (club) => {
    setSelectedClub(club);
    setShowModal(true);
  };

  return (
    <div className="homepage">
      {/* Header with logo and navigation */}
      <Header />

      {/* Full-screen Slideshow */}
      <section
        className="hero-slideshow"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Handle dragging out of the section
      >
        <div className="slideshow-container">
          <div className={`slide fade ${currentSlide === 0 ? 'active' : ''}`}>
            <img src="./src/assets/slide1.jpg" alt="Slide 1" />
          </div>
          <div className={`slide fade ${currentSlide === 1 ? 'active' : ''}`}>
            <img src="./src/assets/slide2.jpg" alt="Slide 2" />
          </div>
          <div className={`slide fade ${currentSlide === 2 ? 'active' : ''}`}>
            <img src="./src/assets/slide3.jpg" alt="Slide 3" />
          </div>

          {/* Dots Navigation */}
          <div className="dots-container">
            <span className={`dot ${currentSlide === 0 ? 'filled' : 'hollow'}`} />
            <span className={`dot ${currentSlide === 1 ? 'filled' : 'hollow'}`} />
            <span className={`dot ${currentSlide === 2 ? 'filled' : 'hollow'}`} />
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        <div className="events-list">
          <div className="event-item">
            <div className="event-date">
              <p>Mar 14 – Mar 20</p>
            </div>
            <div className="event-details">
              <h3>John Derek Teaches Historical Course</h3>
            </div>
            <div className="event-time">
              <p>12:00 am</p>
            </div>
            <div className="event-link">
              <a href="#">Details</a>
            </div>
          </div>
          <div className="event-item">
            <div className="event-date">
              <p>May 29 – May 31</p>
            </div>
            <div className="event-details">
              <h3>Art in Motion</h3>
            </div>
            <div className="event-time">
              <p>12:00 am</p>
            </div>
            <div className="event-link">
              <a href="#">Details</a>
            </div>
          </div>
          <div className="event-item">
            <div className="event-date">
              <p>Aug 01 – Aug 09</p>
            </div>
            <div className="event-details">
              <h3>Chinese Chair Culture Group Meeting</h3>
            </div>
            <div className="event-time">
              <p>12:00 am</p>
            </div>
            <div className="event-link">
              <a href="#">Details</a>
            </div>
          </div>
          <div className="event-item">
            <div className="event-date">
              <p>Aug 16 – Aug 21</p>
            </div>
            <div className="event-details">
              <h3>GreenWorks Trashion Show</h3>
            </div>
            <div className="event-time">
              <p>12:00 am</p>
            </div>
            <div className="event-link">
              <a href="#">Details</a>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Clubs Section */}
      <section className="clubs-section">
        <h2>Featured Clubs</h2>
        <div className="clubs-grid">
          {clubs.map((club) => (
            <div className="club-card" key={club.name}>
              <img src={club.image} alt={club.name} />
              <h3>{club.name}</h3>
              <p>{club.description.substring(0, 50)}...</p>
              <button onClick={() => openModal(club)} className="more-info">
                <i className="fa fa-chevron-down"></i> More Info
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        <ClubModal showModal={showModal} setShowModal={setShowModal} clubData={selectedClub} />
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
          {/* Contact Info */}
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

          {/* Useful Links */}
          <div className="footer-col">
            <h3>Useful Links</h3>
            <ul>
              <li><a href="#">Academics</a></li>
              <li><a href="#">Student Life</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Research</a></li>
            </ul>
          </div>

          {/* Campus Life */}
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
