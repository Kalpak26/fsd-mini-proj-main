/* .src/pages/ClubModal.jsx  */

import React from 'react';
import './ClubModal.css'; // Make sure to create a CSS file for styling

const ClubModal = ({ showModal, setShowModal, clubData }) => {
  if (!showModal || !clubData) return null; // Only render the modal if `showModal` is true

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
        <img src={clubData.image} alt={clubData.name} className="club-image" />
        <h2>{clubData.name}</h2>
        <p><strong>Heads:</strong> {clubData.heads}</p>
        <p><strong>Contact:</strong> {clubData.contact}</p>
        <p><strong>Description:</strong> {clubData.description}</p>
        <div className="modal-buttons">
          <a href={clubData.registrationLink} target="_blank" rel="noopener noreferrer" className="register-button"> Register Here</a>
          <div className="social-links">
            <a href={clubData.instagramLink} target="_blank" rel="noopener noreferrer" className="instagram-link">
              <img src="/src/assets/instagram-icon.png" alt="Instagram" className="instagram-icon"/>
              Follow us on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubModal;
