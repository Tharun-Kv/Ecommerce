// src/pages/Cart.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const location = useLocation();
  const cartItems = location.state?.cart || [];

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, idx) => (
            <div key={idx} className="cart-card">
              <img src={item.img} alt={item.name} />
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
