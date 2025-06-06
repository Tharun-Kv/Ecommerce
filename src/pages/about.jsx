// src/pages/AboutUs.jsx
import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Our E-commerce Store</h1>
        <p>Your One-Stop Shop for Everything You Need</p>
      </div>
      <div className="about-body">
        <section>
          <h2>Who We Are</h2>
          <p>
            We are an online marketplace committed to delivering high-quality products
            across electronics, fashion, lifestyle, and more. With fast delivery and
            reliable customer support, our mission is to make online shopping
            smooth, secure, and enjoyable.
          </p>
        </section>

        <section>
          <h2>What We Offer</h2>
          <ul>
            <li>✔️ Wide range of curated products</li>
            <li>✔️ Fast & secure delivery</li>
            <li>✔️ Easy returns & refund policies</li>
            <li>✔️ Multiple payment options including UPI, COD, Cards</li>
            <li>✔️ Trusted brands and verified sellers</li>
          </ul>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            To empower customers with a seamless shopping experience, competitive
            prices, and 24/7 customer service — all under one digital roof.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
