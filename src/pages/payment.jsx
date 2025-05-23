import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("online");

  const product = location.state?.product || location.state;

  useEffect(() => {
    const timer = setTimeout(() => {
      
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFakePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/order-confirmed", { state: { product } });
    }, 2000);
  };

  if (!product) {
    return <div style={{ padding: 20 }}>No product selected for payment.</div>;
  }

  const renderCardForm = () => (
    <div style={{ marginTop: 20, textAlign: "left", maxWidth: 400, marginInline: "auto" }}>
      <label style={{ display: "block", marginBottom: 10 }}>
        Card Number:
        <input type="text" placeholder="1234 5678 9012 3456" style={inputStyle} />
      </label>
      <label style={{ display: "block", marginBottom: 10 }}>
        Cardholder Name:
        <input type="text" placeholder="Full Name" style={inputStyle} />
      </label>
      <div style={{ display: "flex", gap: 10 }}>
        <label style={{ flex: 1 }}>
          Expiry Date:
          <input type="text" placeholder="MM/YY" style={inputStyle} />
        </label>
        <label style={{ flex: 1 }}>
          CVV:
          <input type="password" placeholder="•••" style={inputStyle} />
        </label>
      </div>
    </div>
  );

  const renderEMIForm = () => (
    <div style={{ marginTop: 20, textAlign: "left", maxWidth: 400, marginInline: "auto" }}>
      <label style={{ display: "block", marginBottom: 10 }}>
        EMI Duration:
        <select style={inputStyle}>
          <option>3 Months</option>
          <option>6 Months</option>
          <option>9 Months</option>
          <option>12 Months</option>
        </select>
      </label>
      {renderCardForm()}
    </div>
  );

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>🧾 Payment Gateway</h2>
      <p>You're buying: <strong>{product.name}</strong></p>
      <img src={product.img} alt={product.name} style={{ width: 200 }} />
      <p>Amount: ₹{product.price.toLocaleString()}</p>

      {/* Payment Methods */}
      <div style={{ marginTop: 20 }}>
        <h3>Select Payment Method:</h3>
        {["online", "debit", "credit", "qr", "emi"].map((method) => (
          <label key={method} style={{ marginRight: 15 }}>
            <input
              type="radio"
              name="payment"
              value={method}
              checked={selectedMethod === method}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />{" "}
            {method.toUpperCase()}
          </label>
        ))}
      </div>

      {/* Conditional UI */}
      <div style={{ marginTop: 20 }}>
        {selectedMethod === "online" && <p>💻 You will be redirected to a secure payment portal.</p>}
        {selectedMethod === "debit" && (
          <>
            <p>💳 Enter your Debit Card details:</p>
            {renderCardForm()}
          </>
        )}
        {selectedMethod === "credit" && (
          <>
            <p>💳 Enter your Credit Card details:</p>
            {renderCardForm()}
          </>
        )}
        {selectedMethod === "qr" && (
          <>
            <p>📱 Scan the QR code using any UPI app:</p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay"
              alt="QR Code"
            />
          </>
        )}
        {selectedMethod === "emi" && (
          <>
            <p>💼 Select EMI duration and enter card details:</p>
            {renderEMIForm()}
          </>
        )}
      </div>

      {/* Payment Button / Spinner */}
      {isProcessing ? (
        <div style={{ marginTop: 30 }}>
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
          <p style={{ fontSize: 18, color: "#0077b6", marginTop: 10 }}>🔄 Processing Payment...</p>
        </div>
      ) : (
        <button
          onClick={handleFakePayment}
          style={{
            marginTop: 30,
            padding: "10px 25px",
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
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
