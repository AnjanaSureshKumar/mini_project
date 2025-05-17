import React, { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Upcoming Events</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : events.length === 0 ? (
        <p className="text-center">No events available.</p>
      ) : (
        <div className="row">
          {events.map((event, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card shadow-sm rounded-3 h-100">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {event.date} at {event.time}
                  </h6>
                  <p className="card-text">{event.description}</p>
                  {event.location && (
                    <p className="text-muted mb-0">
                      <strong>Location:</strong> {event.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;