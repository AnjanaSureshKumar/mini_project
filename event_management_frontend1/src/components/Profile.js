import React, { useEffect, useState } from "react";

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/login"; // or use navigate from react-router
};

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
    }
  }, []);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <p className="alert alert-warning">No profile found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 rounded-4 text-center">
        <h2 className="mb-4">My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <div className="mt-4">
          <button
            className="btn bg-danger-subtle w-100"
            onClick={handleLogout}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Logout⛔
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
