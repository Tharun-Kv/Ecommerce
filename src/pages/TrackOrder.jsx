import React, { useState } from "react";
import { Link } from 'react-router-dom';
const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");

  const handleTrackOrder = () => {
    alert(`Tracking Order:\nOrder ID: ${orderId}\nEmail: ${email}`);
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#90e0ef] to-[#00b4d8] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-[#03045e] mb-6">
          Track Order
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order ID
            </label>
            <input
              type="text"
              placeholder="Enter your order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
            />
          </div>
          <button
            onClick={handleTrackOrder}
            className="w-full bg-[#0077b6] hover:bg-[#023e8a] text-white text-lg rounded-xl py-2"
          >
            Track Order
          </button>
         <Link to="/welcome" style={{ textDecoration: "none", color: "inherit", padding : "652px", }}>
                Home
              </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
