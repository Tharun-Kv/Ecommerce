import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { FaUserCog, FaUsers, FaChartLine, FaSignOutAlt, FaTimes } from "react-icons/fa";
import Analyze from "./Analyze"; // Import the Analyze component we created earlier

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleCardClick = (view) => {
    setActiveView(view);
  };

  const closeActiveView = () => {
    setActiveView(null);
  };
const handlecard = (view) => {
    navigate("/Analyze");
  };
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {activeView ? (
        <div className="admin-view-container">
          <div className="admin-view-header">
            <h2>
              {activeView === "reports" && "Reports & Analytics"}
              {activeView === "admins" && "Manage Admins"}
              {activeView === "users" && "Manage Users"}
            </h2>
            <button onClick={closeActiveView} className="close-button">
              <FaTimes />
            </button>
          </div>
          
          <div className="admin-view-content">
            {activeView === "reports" && <Analyze />}
            {activeView === "admins" && <div>Admin Management Content</div>}
            {activeView === "users" && <div>User Management Content</div>}
          </div>
        </div>
      ) : (
        <div className="admin-grid">
          <div className="admin-card" onClick={() => handleCardClick("admins")}>
            <FaUserCog className="admin-icon" />
            <h3>Manage Admins</h3>
            <p>View, add or remove admin accounts</p>
          </div>

          <div className="admin-card" onClick={() => handleCardClick("users")}>
            <FaUsers className="admin-icon" />
            <h3>Manage Users</h3>
            <p>Control user access and permissions</p>
          </div>

          <div className="admin-card" onClick={() => handlecard("reports")}>
            <FaChartLine className="admin-icon" />
            <h3>Reports & Analytics</h3>
            <p>View user activity and system reports</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;