import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import "./login.css";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const isAdmin = username === "admin" && password === "admin@123";
    const isUser = username === "Tharun" && password === "Tharun@17";

    if (isAdmin || isUser) {
      localStorage.setItem("loggedInUser", username);
      if (rememberMe) {
        localStorage.setItem("savedUsername", username);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedUsername");
        localStorage.removeItem("savedPassword");
      }

      // Navigate based on credentials
      if (isAdmin) {
        navigate("/AdminDashboard");
      } else {
        navigate("/welcome");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Logged in as ${result.user.displayName}`);
      navigate("/welcome");
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      alert(`Logged in as ${result.user.displayName}`);
      navigate("/welcome");
    } catch (error) {
      console.error("Facebook login error:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Please wait, your login page is loading...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">Welcome Back</h2>

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="divider"><span>or</span></div>

          <div className="social-login-buttons">
            <button type="button" className="icon-button" onClick={handleGoogleLogin}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            </button>
            <button type="button" className="icon-button" onClick={handleFacebookLogin}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" />
            </button>
          </div>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;