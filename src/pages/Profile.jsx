import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    joined: "",
    profileImage: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Check if user has Google profile photo
        const googlePhoto = firebaseUser.providerData.some(
          provider => provider.providerId === 'google.com' && provider.photoURL
        ) ? firebaseUser.photoURL + "?sz=200" // Higher resolution
          : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

        setUser({
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email || "",
          mobile: firebaseUser.phoneNumber || "",
          address: "",
          joined: firebaseUser.metadata.creationTime 
            ? new Date(firebaseUser.metadata.creationTime).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })
            : "Unknown",
          profileImage: googlePhoto
        });
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

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
          <img 
            src={user.profileImage} 
            alt="Profile" 
            style={styles.image}
            onError={(e) => {
              e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
            }}
          />
          {user.profileImage.includes('googleusercontent.com') && (
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Google profile photo
            </p>
          )}
        </div>

        <div style={styles.details}>
          <div style={styles.row}><strong>Name:</strong> {user.name}</div>
          <div style={styles.row}><strong>Email:</strong> {user.email}</div>
          <div style={styles.row}><strong>Mobile:</strong> {user.mobile || "Not provided"}</div>
          <div style={styles.row}><strong>Address:</strong> {user.address || "Not provided"}</div>
          <div style={styles.row}><strong>Member Since:</strong> {user.joined}</div>

          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={() => alert("Edit Profile clicked")}>
              ✏️ Edit Profile
            </button>
            <button style={styles.button} onClick={() => alert("Change Password clicked")}>
              🔒 Change Password
            </button>
            <button 
              style={styles.logoutButton} 
              onClick={() => {
                auth.signOut();
                navigate("/");
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles remain the same as before
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

export default Profile;