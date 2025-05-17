import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    usn: '',
    college: '',
    eventsManaged: []
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data); // Using the response to set events in state
      } catch (err) {
        console.error('Failed to fetch events', err);
      }
    };
    fetchEvents();
  }, []);

  const handleChange = e => {
    const { name, value, type } = e.target;

    if (type === 'select-multiple') {
      const selected = Array.from(e.target.selectedOptions, opt => opt.value);
      setFormData(prev => ({ ...prev, [name]: selected }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      await axios.post('http://localhost:5000/api/organizers/register', formData);
      alert('Organizer registered successfully!');
      setFormData({
        name: '',
        email: '',
        contact: '',
        password: '',
        usn: '',
        college: '',
        eventsManaged: []
      });
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register Organizer</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input className="form-control mb-2" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input className="form-control mb-2" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input className="form-control mb-2" name="usn" placeholder="USN" value={formData.usn} onChange={handleChange} required />
        <input className="form-control mb-2" name="college" placeholder="College" value={formData.college} onChange={handleChange} required />

        <label>Select Events</label>
        <select
          className="form-control mb-3"
          name="eventsManaged"
          value={formData.eventsManaged}
          onChange={handleChange}
          multiple
          required
        >
          {events.map(event => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>

        <input className="form-control mb-3" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button className="btn bg-danger-subtle btn-lg">Register</button>
      </form>
    </div>
  );
};

export default OrganizerRegister;
