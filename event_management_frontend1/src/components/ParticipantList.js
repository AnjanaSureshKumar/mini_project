import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/participants')
      .then(res => setParticipants(res.data))
      .catch(err => console.error('Error fetching participants:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>All Participants</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>USN</th>
            <th>College</th>
            <th>Events Registered</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.usn}</td>
              <td>{p.college}</td>
              <td>{p.eventsRegistered.map(e => e.title).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantList;
