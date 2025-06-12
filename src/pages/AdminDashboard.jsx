import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { FaUserCog, FaUsers, FaChartLine, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> Logout
        </button>
      </header>

      <div className="admin-grid">
        <div className="admin-card">
          <FaUserCog className="admin-icon" />
          <h3>Manage Admins</h3>
          <p>View, add or remove admin accounts</p>
        </div>

        <div className="admin-card">
          <FaUsers className="admin-icon" />
          <h3>Manage Users</h3>
          <p>Control user access and permissions</p>
        </div>

        <div className="admin-card">
          <FaChartLine className="admin-icon" />
          <h3>Reports & Analytics</h3>
          <p>View user activity and system reports</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
