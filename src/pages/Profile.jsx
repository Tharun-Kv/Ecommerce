import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
  

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Tharun K V",
    email: "tharunkv742004@gmail.com",
    mobile: "8277487233",
    address: "Maddur, Mandya District, Karnataka",
    joined: "January 2024",
    profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: imageUrl,
      }));
    }
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>

      <div style={styles.profileCard}>
        <div style={{ textAlign: "center" }}>
          <img src={user.profileImage} alt="Profile" style={styles.image} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "10px" }}
          />
        </div>

        <div style={styles.details}>
          <div style={styles.row}><strong>Name:</strong> {user.name}</div>
          <div style={styles.row}><strong>Email:</strong> {user.email}</div>
          <div style={styles.row}><strong>Mobile:</strong> {user.mobile}</div>
          <div style={styles.row}><strong>Address:</strong> {user.address}</div>
          <div style={styles.row}><strong>Member Since:</strong> {user.joined}</div>

          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={() => alert("Edit Profile clicked")}>
              ✏️ Edit Profile
            </button>
            <button style={styles.button} onClick={() => alert("Change Password clicked")}>
              🔒 Change Password
            </button>
            <button style={styles.logoutButton} onClick={() => navigate("/")}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// Inline Styles
const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f1f3f6",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#023e8a",
    fontSize: "28px",
    marginBottom: "30px",
  },
  profileCard: {
    display: "flex",
    gap: "30px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    padding: "25px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #0077b6",
  },
  details: {
    flex: 1,
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#333",
  },
  row: {
    marginBottom: "10px",
  },
  buttonGroup: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  button: {
    padding: "10px 16px",
    background: "#0096c7",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
  logoutButton: {
    padding: "10px 16px",
    background: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
};
