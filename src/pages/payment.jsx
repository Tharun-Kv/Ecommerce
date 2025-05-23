import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || location.state;

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = () => {
    if (paymentMethod === "card" && cardNumber.length < 10) {
      navigate("/error-404");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      navigate("/order-confirmed", { state: { product } });
    }, 2000);
  };

  if (!product) {
    return <div style={{ padding: 20 }}>No product selected for payment.</div>;
  }

  if (isLoading) {
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

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>🧾 Payment Gateway</h2>
      <p>You're buying: <strong>{product.name}</strong></p>
      <img src={product.img} alt={product.name} style={{ width: 200 }} />
      <p>Amount: ₹{product.price.toLocaleString()}</p>

      <div style={{ marginTop: 30, textAlign: "left", maxWidth: 400, margin: "auto" }}>
        <label><strong>Select Payment Method:</strong></label><br />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{ padding: 8, width: "100%", marginTop: 8 }}
        >
          <option value="card">Credit/Debit Card</option>
          <option value="qr">Scan & Pay (QR)</option>
          <option value="emi">EMI Option</option>
          <option value="online">Online Wallets</option>
        </select>

        {paymentMethod === "card" && (
          <div style={{ marginTop: 20 }}>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />
            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              style={{ width: "48%", padding: 10, marginRight: "4%" }}
            />
            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              style={{ width: "48%", padding: 10 }}
            />
          </div>
        )}

        {paymentMethod === "qr" && (
          <div style={{ marginTop: 20 }}>
            <p>Scan below QR with any UPI app:</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/QR_code_example.png" width="150" alt="QR Code" />
          </div>
        )}

        {paymentMethod === "emi" && (
          <div style={{ marginTop: 20 }}>
            <p>Select EMI Duration:</p>
            <select style={{ padding: 10, width: "100%" }}>
              <option>3 Months - ₹{(product.price / 3).toFixed(0)}</option>
              <option>6 Months - ₹{(product.price / 6).toFixed(0)}</option>
              <option>12 Months - ₹{(product.price / 12).toFixed(0)}</option>
            </select>
          </div>
        )}

        {paymentMethod === "online" && (
          <div style={{ marginTop: 20 }}>
            <p>Select Wallet:</p>
            <select style={{ padding: 10, width: "100%" }}>
              <option>PhonePe</option>
              <option>Paytm</option>
              <option>Razorpay</option>
              <option>Amazon Pay</option>
            </select>
          </div>
        )}
      </div>

      {isProcessing ? (
        <div style={{ marginTop: 30 }}>
          <div className="spinner"></div>
          <p style={{ fontSize: 18, color: "#0077b6", marginTop: 10 }}>
            🔄 Processing Payment...
          </p>
        </div>
      ) : (
        <button
          onClick={handlePayment}
          style={{
            marginTop: 30,
            padding: "12px 30px",
            backgroundColor: "#0077b6",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: 16
          }}
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
