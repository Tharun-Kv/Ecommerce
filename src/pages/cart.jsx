// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

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

      
      <button className="clear-cart-btn" onClick={() => {
  localStorage.removeItem("cart");
  setCartItems([]);
}}>Clear Cart</button>

    </div>
    
  );
};

export default Cart;
