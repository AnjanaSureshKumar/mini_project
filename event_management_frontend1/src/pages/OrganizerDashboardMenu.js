import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles.css"

const OrganizerDashboardMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-#FB5BB mb-4">🎯 Organizer Dashboard</h2>
      <p className="lead">Choose what you want to do:</p>

      <div className="d-grid gap-4 col-6 mx-auto mt-4" style={styles.buttonContainer} >
        <button
          className="btn bg-danger-subtle btn-lg"
          onClick={() => navigate('/create')}
        >
          ➕ Create Event
        </button>

        <button
          className="btn bg-danger-subtle btn-lg"
          onClick={() => navigate('/organizer-dashboard/edit')}
        >
          🛠️ Edit / Delete Events
        </button>
      </div>
    </div>
  );
};

export default OrganizerDashboardMenu;
