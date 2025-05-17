import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParticipantRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    usn: '',
    college: '',
    eventsRegistered: [] // This will hold an array of event IDs
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all events when the component is mounted
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setErrorMessage('Unable to load events. Please try again later.');
      }
    };

    fetchEvents();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'select-multiple') {
      const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selected })); // Update eventsRegistered array
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    console.log('Submitting form data:', formData);

    try {
      await axios.post('http://localhost:5000/api/participants/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Participant registered successfully!');
      setFormData({
        name: '',
        email: '',
        contact: '',
        password: '',
        usn: '',
        college: '',
        eventsRegistered: [], // Reset the events
      });
    } catch (err) {
      console.error('Error response:', err.response);
      setErrorMessage(
        err.response?.data?.message || 'Registration failed. Please check your input or try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register Participant</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="usn"
          placeholder="USN"
          value={formData.usn}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="college"
          placeholder="College"
          value={formData.college}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Select Events</label>
        <select
          className="form-control mb-3"
          name="eventsRegistered"
          value={formData.eventsRegistered}
          onChange={handleChange}
          multiple
          required
        >
          {events.length > 0 ? (
            events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.title}
              </option>
            ))
          ) : (
            <option disabled>No events available</option>
          )}
        </select>

        <button
          className="btn bg-danger-subtle btn-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default ParticipantRegister;
