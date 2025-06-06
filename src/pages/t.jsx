// src/pages/Settings.jsx
import React, { useState } from "react";
import "./t.css";
import { auth } from "./firebase-config";
import { updateProfile } from "firebase/auth";

const Settings = () => {
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName: name });
      // You can also update address/mobile to Firestore here if needed
      setStatus("Profile updated successfully!");
    } catch (err) {
      setStatus("Update failed. Try again.");
    }
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      <form onSubmit={handleUpdate} className="settings-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email (Read-only)</label>
          <input type="email" value={email} readOnly />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Shipping Address</label>
          <textarea
            rows="3"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Update Profile</button>

        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
};

export default Settings;
