import React, { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    location: ""
  });

  const handleChange = (e) => {
    setEventData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual backend API
      const response = await axios.post("http://localhost:5000/api/events", eventData);
      alert("Event created successfully!");
      console.log(response.data);
      setEventData({
        title: "",
        date: "",
        time: "",
        description: "",
        location: ""
      });
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="container mt-5 mb-5" color="#DDFFF7">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4 rounded-4">
            <h2 className="text-center mb-4">Create New Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="title">Event Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter event title"
                  value={eventData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row d-flex gap-3 mb-3">
                <div className="form-group flex-fill">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group flex-fill">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    value={eventData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Event location (optional)"
                  value={eventData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Describe the event"
                  rows="4"
                  value={eventData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn bg-danger-subtle btn-lg">
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;