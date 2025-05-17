import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';

// Components
import CreateEvent from "./components/CreateEvent";
import EventList from "./components/EventList";
import OrganizerRegister from './components/OrganiserRegister';
import ParticipantRegister from './components/ParticipantRegister';
import Register from './components/Register'; // optional, if still used
import Login from './components/Login';
import ParticipantList from './components/ParticipantList';
import OrganizerList from './components/OrganizerList';
import Profile from './components/Profile';
import ChooseRegister from './components/ChooseRegister';
import ChooseList from './components/ChooseList';
// Pages
import OrganizerDashboardMenu from './pages/OrganizerDashboardMenu';
import OrganizerEventManager from './pages/OrganizerEventManager';
import Dashboard from './pages/Dashboard';

const AppWrapper = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isOrganizer = user?.role === "organizer";
  const isParticipant = user?.role === "participant";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FFB5BE" }}>
        <Link className="navbar-brand" to="/" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}> 🪩 EventManager 🪩</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>Events</Link>
            </li>
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>Login</Link>
                </li>
              </>
            ) : (
              <>
                {isParticipant && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/participants/register" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>Participant registration</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/lists" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>Lists</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>My Profile 👤</Link>
                    </li>

                  </>
                )}

                {isOrganizer && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/organizer-dashboard" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>Organizer Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register-choose" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>Event Registration</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/lists" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>Lists</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile" style={{ color: "#333333", fontFamily: 'Poppins, sans-serif' }}>My Profile 👤</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/organizers/register" element={<OrganizerRegister />} />
        <Route path="/participants/register" element={<ParticipantRegister />} />
        <Route path="/participants" element={<ParticipantList />} />
        <Route path="/organizers" element={<OrganizerList />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboardMenu />} />
        <Route path="/organizer-dashboard/edit" element={<OrganizerEventManager />} />
        <Route path="/register-choose" element={<ChooseRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lists" element={<ChooseList />} />
        <Route path="/profile" element={<Profile onLogout={handleLogout} />} />

      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
