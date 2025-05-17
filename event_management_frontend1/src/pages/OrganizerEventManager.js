import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      alert('Failed to fetch events.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, date, time, description } = form;

    if (!title || !date || !time || !description) {
      alert('All fields except location are required.');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/events/${editingId}`, form);
        setEditingId(null);
        setForm({ title: '', date: '', time: '', location: '', description: '' });
        fetchEvents();
      }
    } catch (err) {
      alert('Error updating event.');
    }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      date: event.date?.slice(0, 10),
      time: event.time || '',
      location: event.location || '',
      description: event.description,
    });
    setEditingId(event._id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: '', date: '', time: '', location: '', description: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        fetchEvents();
      } catch (err) {
        alert('Failed to delete event.');
      }
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 text-primary">Edit/Delete section</h2>

      {editingId && (
        <div className="row mb-5">
          <div className="col-md-6 offset-md-3">
            <div className="card shadow p-4 rounded-4 bg-light border-warning">
              <h4 className="text-center mb-3 text-warning">Edit Event</h4>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="form-control mb-2"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <div className="d-flex gap-2 mb-2">
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    name="time"
                    className="form-control"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  type="text"
                  name="location"
                  placeholder="Location (optional)"
                  className="form-control mb-2"
                  value={form.location}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  className="form-control mb-3"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-warning">Update Event</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <h4 className="mb-3 text-center">Event List</h4>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-primary">
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(evt => (
              <tr key={evt._id}>
                <td>{evt.title}</td>
                <td>{evt.date?.slice(0, 10)}</td>
                <td>{evt.description}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(evt)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(evt._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizerDashboard;

