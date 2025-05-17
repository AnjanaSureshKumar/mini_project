import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrganizerList = () => {
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/organizers')
      .then(res => setOrganizers(res.data))
      .catch(err => console.error('Failed to fetch organizers:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>All Organizers</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Events Managed</th>
            <th>USN</th>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          {organizers.map(o => (
            <tr key={o._id}>
              <td>{o.name}</td>
              <td>{o.email}</td>
              <td>{o.contact}</td>
              <td>{o.eventsManaged.map(e => e.title).join(', ')}</td>
              <td>{o.usn}</td>
              <td>{o.college}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizerList;
