// src/components/ClubManagement.jsx
import React, { useEffect, useState } from 'react';
import { clubService } from '../services/api';

const ClubManagement = () => {
  const [clubs, setClubs] = useState([]);
  const [newClub, setNewClub] = useState({
    name: '',
    description: '',
    heads: '',
    contact: '',
    registrationLink: ''
  });
  const [editingClub, setEditingClub] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const data = await clubService.getAllClubs();
      setClubs(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch clubs');
      console.error(err);
    }
  };

  const addClub = async () => {
    try {
      await clubService.createClub(newClub);
      setNewClub({ name: '', description: '', heads: '', contact: '', registrationLink: '' });
      fetchClubs();
      setError(null);
    } catch (err) {
      setError('Failed to add club');
      console.error(err);
    }
  };

  const updateClub = async () => {
    try {
      await clubService.updateClub(editingClub._id, newClub);
      setNewClub({ name: '', description: '', heads: '', contact: '', registrationLink: '' });
      setEditingClub(null);
      fetchClubs();
      setError(null);
    } catch (err) {
      setError('Failed to update club');
      console.error(err);
    }
  };

  const deleteClub = async (clubId) => {
    try {
      if (window.confirm('Are you sure you want to delete this club?')) {
        await clubService.deleteClub(clubId);
        fetchClubs();
        setError(null);
      }
    } catch (err) {
      setError('Failed to delete club');
      console.error(err);
    }
  };

  const handleEdit = (club) => {
    setEditingClub(club);
    setNewClub({ ...club });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Clubs</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            value={newClub.name}
            onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
            placeholder="Club Name"
            className="border p-2 rounded"
          />
          <textarea
            value={newClub.description}
            onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
            placeholder="Description"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={newClub.heads}
            onChange={(e) => setNewClub({ ...newClub, heads: e.target.value })}
            placeholder="Heads"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={newClub.contact}
            onChange={(e) => setNewClub({ ...newClub, contact: e.target.value })}
            placeholder="Contact"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={newClub.registrationLink}
            onChange={(e) => setNewClub({ ...newClub, registrationLink: e.target.value })}
            placeholder="Registration Link"
            className="border p-2 rounded"
          />

          <button
            onClick={editingClub ? updateClub : addClub}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editingClub ? 'Update Club' : 'Add Club'}
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {clubs.map((club) => (
          <div key={club._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">{club.name}</h3>
              <p className="text-gray-600">{club.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(club)}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteClub(club._id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubManagement;