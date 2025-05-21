import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // 🔼 Move this UP here!
  const product = location.state?.product || location.state;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return <div style={{ padding: 20 }}>No product selected for payment.</div>;
  }


  const handleFakePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/order-confirmed", { state: { product } });
    }, 2000);
  };

  if (!showDetails) {
    // Initial loading spinner (blank page)
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <style>{`
          .spinner {
            border: 8px solid #caf0f8;
            border-top: 8px solid #0077b6;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div className="spinner"></div>
      </div>
    );
  }

  // After initial spinner, show payment details
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>🧾 Payment Gateway</h2>
      <p>You're buying: <strong>{product.name}</strong></p>
      <img src={product.img} alt={product.name} style={{ width: 200 }} />
      <p>Amount: ₹{product.price.toLocaleString()}</p>

      {isProcessing ? (
        <div style={{ marginTop: 30 }}>
          <div className="spinner"></div>
          <p style={{ fontSize: 18, color: "#0077b6", marginTop: 10 }}>
            🔄 Processing Payment...
          </p>
        </div>
      ) : (
        <button
          onClick={handleFakePayment}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
