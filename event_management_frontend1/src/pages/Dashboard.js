import React from "react";
import { Link } from "react-router-dom";
import '../styles.css'; // make sure this file exists or create it

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Welcome to Your Event Dashboard</h2>
        <p className="text-muted">Manage your college events seamlessly</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-4 shadow rounded-4">
            <div className="card-body text-center">
              <h5 className="card-title">Create a New Event</h5>
              <p className="card-text">Plan and publish your upcoming event.</p>
              <Link to="/create" className="btn btn-light btn-sm mt-2">Go to Create</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success mb-4 shadow rounded-4">
            <div className="card-body text-center">
              <h5 className="card-title">View All Events</h5>
              <p className="card-text">Browse and manage your scheduled events.</p>
              <Link to="/" className="btn btn-light btn-sm mt-2">View Events</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🎉 Upcoming Event Section */}
      <div className="card gradient-card shadow-lg p-4 rounded-4 text-white mt-5">
        <h4>🎉 Upcoming Event</h4>
        <p>Don’t miss our next exciting campus event. Stay tuned for updates!</p>
      </div>
    </div>
  );
};

export default Dashboard;
