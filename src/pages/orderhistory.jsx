import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(stored);
  }, []);

  return (
    <div className="history-container">
      <h2>📦 Order History</h2>
      {orders.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order, index) => (
            <li key={index} className="order-card">
              <img src={order.img} alt={order.name} className="order-img" />
              <div>
                <h3>{order.name}</h3>
                <p>Price: ₹{order.price.toLocaleString()}</p>
                <p>Payment: {order.paymentMethod}</p>
                <p>Date: {order.purchaseDate}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .history-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          background: #f4f6f8;
          border-radius: 10px;
        }

        .order-list {
          list-style: none;
          padding: 0;
        }

        .order-card {
          background: white;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          display: flex;
          gap: 20px;
        }

        .order-img {
          width: 100px;
          border-radius: 6px;
        }

        h2 {
          text-align: center;
          color: #0d6efd;
          margin:inherit;
        }
      `}</style>
    </div>
  );
};

export default OrderHistory;
