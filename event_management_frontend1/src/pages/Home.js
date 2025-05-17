import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-light rounded-4 shadow-sm">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">College Event Management System</h1>
          <p className="col-md-8 fs-5 text-muted">
            Organize, create, and keep track of all college events in one place.
            Register now and simplify your event coordination experience.
          </p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-primary btn-lg me-3">Register</Link>
            <Link to="/login" className="btn btn-outline-secondary btn-lg">Login</Link>
          </div>
        </div>
      </div>

      <div className="row text-center mt-5">
        <div className="col-md-4">
          <h5>Plan Events</h5>
          <p className="text-muted">Easily create and schedule events for your campus.</p>
        </div>
        <div className="col-md-4">
          <h5>Manage Participants</h5>
          <p className="text-muted">Track attendees and participant information efficiently.</p>
        </div>
        <div className="col-md-4">
          <h5>Stay Updated</h5>
          <p className="text-muted">View upcoming events and get instant updates.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;