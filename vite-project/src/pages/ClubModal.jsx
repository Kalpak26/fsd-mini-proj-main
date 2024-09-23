import React from 'react';
import './ClubModal.css'; // Make sure to create a CSS file for styling

const ClubModal = ({ showModal, setShowModal, clubData }) => {
  if (!showModal) return null; // Only render the modal if `showModal` is true

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
        <h2>{clubData.name}</h2>
        <p><strong>Heads:</strong> {clubData.heads}</p>
        <p><strong>Contact:</strong> {clubData.contact}</p>
        <p><strong>Description:</strong> {clubData.description}</p>
        <a href={clubData.registrationLink} target="_blank" rel="noopener noreferrer">Register Here</a>
      </div>
    </div>
  );
};

export default ClubModal;
