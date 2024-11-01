// src/components/EventManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  
  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    startDate: '',
    endDate: '',
    time: '',
    description: '',
    registrationLink: ''
  });

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new event
  const addEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/events', newEvent, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewEvent({
        title: '',
        startDate: '',
        endDate: '',
        time: '',
        description: '',
        registrationLink: ''
      });
      fetchEvents();
    } catch (err) {
      setError('Failed to add event');
      console.error('Error adding event:', err);
    }
  };

  // Update event
  const updateEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, newEvent, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewEvent({
        title: '',
        startDate: '',
        endDate: '',
        time: '',
        description: '',
        registrationLink: ''
      });
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      setError('Failed to update event');
      console.error('Error updating event:', err);
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    try {
      if (window.confirm('Are you sure you want to delete this event?')) {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchEvents();
      }
    } catch (err) {
      setError('Failed to delete event');
      console.error('Error deleting event:', err);
    }
  };

  // Handle edit button click
  const handleEdit = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      startDate: event.startDate.split('T')[0], // Format date for input
      endDate: event.endDate.split('T')[0],
      time: event.time,
      description: event.description,
      registrationLink: event.registrationLink || ''
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="event-management p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      {/* Event Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            placeholder="Event Title"
            className="border p-2 rounded"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                value={newEvent.startDate}
                onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                value={newEvent.endDate}
                onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            className="border p-2 rounded"
          />

          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Event Description"
            className="border p-2 rounded h-24"
          />

          <input
            type="url"
            value={newEvent.registrationLink}
            onChange={(e) => setNewEvent({ ...newEvent, registrationLink: e.target.value })}
            placeholder="Registration Link"
            className="border p-2 rounded"
          />

          <button
            onClick={editingEvent ? updateEvent : addEvent}
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            {editingEvent ? 'Update Event' : 'Add Event'}
          </button>
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="text-center">Loading events...</div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(event.startDate)} - {formatDate(event.endDate)}
                </p>
                <p className="text-sm">{event.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(event._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventManagement;