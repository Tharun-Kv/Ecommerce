import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="top-icons">
        <div className="icon-item">
          <img src="https://img.icons8.com/ios/50/lock--v1.png" alt="Secure Payments" />
          <p>Secure Payments</p>
        </div>
        <div className="icon-item">
          <img src="https://img.icons8.com/ios/50/delivery.png" alt="Shipping in India" />
          <p>Shipping in India</p>
        </div>
        <div className="icon-item">
          <img src="https://img.icons8.com/ios/50/facebook-like.png" alt="Great Value" />
          <p>Great Value & Quality</p>
        </div>
      </div>

      <div className="footer-links">
        <div>
          <h4>Policies</h4>
          <ul>
            <li>
               <Link to="/cancellationandrefund" style={{ textDecoration: "none", color: "inherit" }}>
                Cancellation & Refund
              </Link>
            </li>
            <li>Terms & Conditions</li>
            <li>Shipping & Delivery</li>
            <li>
              <Link to="/PrivacyPage" style={{ textDecoration: "none", color: "inherit" }}>
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Account</h4>
          <ul>
            <li>
              {/* Link to the track order page */}
              <Link to="/TrackOrder" style={{ textDecoration: "none", color: "inherit" }}>
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li>
              <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                About us
              </Link>
            </li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p><img src="https://img.icons8.com/ios/20/phone.png" alt="Phone" /> 
          <a href="tel:8277487233">8277487233</a>
          </p>
         <p>
  <img src="https://img.icons8.com/ios/20/filled-message.png" alt="Email" /> 
  <a href="mailto:Ecommrece@gmail.com" >
    Ecommrece@gmail.com
  </a>
</p>
          <p>
  <img src="https://img.icons8.com/ios/20/marker.png" alt="Location" />
  <a
    href="https://www.google.com/maps/search/?api=1&query=JP+Nagar+Bengaluru+Karnataka"
    target="_blank"
    rel="noopener noreferrer"
    
  > JP Nagar,Bengaluru,Karnataka
  </a>
</p>
        </div>
      </div>

      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8gCU7Oj_pRM0n2oyCJLScrR1cx2cOtv_pLc5zlJ6zCW1QtKgYFb3eMCmrinsMSaNM90&usqp=CAU" alt="Twitter" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
        </a>
        <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Pinterest" />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQy1ayTxdtVI7a6XhclpabhMk7U2HL4xry2w&s" alt="YouTube" />
        </a>
      </div>

      <div className="footer-bottom">
        <span className="footer-logo">THARUN</span>
        <p>© Ecommrece 2025 • All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
