import React, { useState } from "react";
import axios from "../axiosConfig"; // or just 'axios' if no custom config
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "participant", // Default role is participant
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      alert("Registered successfully!");
      console.log(response.data);

      // Clear form and store user data in localStorage
      setFormData({ name: "", email: "", password: "", role: "participant" });

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify({ ...formData, role: response.data.role }));

      // Redirect to login or appropriate dashboard
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4 rounded-4">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="form-group mb-3">
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="participant">Participant</option>
                  <option value="organizer">Organizer</option>
                </select>
              </div>

              <button type="submit" className="btn bg-danger-subtle btn-lg w-100">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
