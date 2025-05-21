import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmed = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfirmation(true);
    }, 2000); // Change to 120000 for 2 minutes if needed
    return () => clearTimeout(timer);
  }, []);

  if (!showConfirmation) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <style>{`
          .spinner {
            margin: 0 auto;
            border: 6px solid #caf0f8;
            border-top: 6px solid #0077b6;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div className="spinner"></div>
        <p style={{ marginTop: 10, color: "#0077b6" }}>Confirming your order...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>✅ Order Confirmed</h2>
      <p>Thank you for your purchase.</p>
      {product && (
        <>
          <img
            src={product.img}
            alt={product.name}
            style={{ width: 200, marginBottom: 10 }}
          />
          <h3>{product.name}</h3>
          <p>Paid: ₹{product.price.toLocaleString()}</p>
        </>
      )}
      <Link to="/welcome" style={{ marginTop: 20, display: "inline-block" }}>
        ⬅️ Back to Home
      </Link>
    </div>
  );
};

export default OrderConfirmed;
