import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous error

    try {
      // Make API call for login (backend checks the credentials)
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);

      // Log the response to check if the role is there
      console.log("Login response:", response.data); // ✅ Debugging line

      // Save user data and token to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      alert("Login successful!");

      // Role-based redirection
      const role = response.data.user.role;

      if (role === "organizer") {
        // Redirect to organizer dashboard
        navigate("/");
      } else if (role === "participant") {
        // Redirect to participant dashboard
        navigate("/");
      } else {
        alert("Unknown role. Redirecting to home.");
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4 rounded-4">
            <h2 className="text-center mb-4">Login</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="btn bg-danger-subtle btn-lg w-100">
                Login
              </button>
            </form>

            <div className="text-center mt-3">
              <small>
                Don't have an account? <a href="/register">Register here</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
