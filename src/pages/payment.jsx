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
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = () => {
    if (paymentMethod === "card" && cardNumber.replace(/\s+/g, '').length < 10) {
      navigate("/error-404");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/order-confirmed", { state: { product } });
    }, 2000);
  };

  if (!product) {
    return (
      <div className="no-product-message">
        No product selected for payment.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="spinner-container" aria-label="Loading payment gateway">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <main className="payment-wrapper fade-in" role="main" aria-labelledby="payment-header">
      <h2 id="payment-header" className="title">🧾 Payment Gateway</h2>
      <section className="product-info" aria-label={`Product you are buying: ${product.name}`}>
        <p>
          You're buying: <strong>{product.name}</strong>
        </p>
        <img
          src={product.img}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <p className="price">Amount: ₹{product.price.toLocaleString()}</p>
      </section>

      <form
        className="payment-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!isProcessing) handlePayment();
        }}
        noValidate
      >
        <label htmlFor="paymentMethod" className="label">
          Select Payment Method:
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="select"
          aria-required="true"
        >
          <option value="card">Credit/Debit Card</option>
          <option value="qr">Scan & Pay (QR)</option>
          <option value="emi">EMI Option</option>
          <option value="online">Online Wallets</option>
        </select>

        {paymentMethod === "card" && (
          <fieldset className="card-details" aria-label="Credit or debit card details">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="input"
              name="cardNumber"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              maxLength={19}
              required
              aria-required="true"
              autoComplete="cc-number"
            />
            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="input"
              name="cardHolder"
              required
              aria-required="true"
              autoComplete="cc-name"
            />
            <div className="half-inputs">
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="input half"
                name="expiry"
                pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                required
                aria-required="true"
                autoComplete="cc-exp"
              />
              <input
                type="password"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="input half"
                name="cvv"
                maxLength={4}
                required
                aria-required="true"
                autoComplete="cc-csc"
              />
            </div>
          </fieldset>
        )}

        {paymentMethod === "qr" && (
          <section className="qr-section" aria-label="QR code payment option">
            <p>Scan below QR with any UPI app:</p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay"
              alt="UPI QR Code"
              className="qr-image"
              loading="lazy"
            />
          </section>
        )}

        {paymentMethod === "emi" && (
          <section className="emi-section" aria-label="EMI options">
            <label htmlFor="emiDuration" className="label">Select EMI Duration:</label>
            <select id="emiDuration" className="select">
              <option>3 Months - ₹{(product.price / 3).toFixed(0)}</option>
              <option>6 Months - ₹{(product.price / 6).toFixed(0)}</option>
              <option>12 Months - ₹{(product.price / 12).toFixed(0)}</option>
            </select>
          </section>
        )}

        {paymentMethod === "online" && (
          <section className="wallet-section" aria-label="Online wallet payment options">
            <label htmlFor="walletSelect" className="label">Select Wallet:</label>
            <select id="walletSelect" className="select">
              <option>PhonePe</option>
              <option>Paytm</option>
              <option>Razorpay</option>
              <option>Amazon Pay</option>
            </select>
          </section>
        )}

        {isProcessing ? (
          <div className="processing-container" aria-live="polite" aria-busy="true">
            <div className="spinner"></div>
            <p className="processing-text">🔄 Processing Payment...</p>
          </div>
        ) : (
          <button
            type="submit"
            className="pay-button"
            disabled={isProcessing}
            aria-disabled={isProcessing}
          >
            Pay Now
          </button>
        )}
      </form>

      <style>{`
        /* Root styling variables */
        :root {
          --primary-color: #0d6efd;
          --primary-hover: #0b5ed7;
          --bg-color: #f8f9fa;
          --input-bg: #ffffff;
          --input-border: #ced4da;
          --input-focus: #0d6efd;
          --text-color: #212529;
          --shadow-light: rgba(13, 110, 253, 0.25);
          --shadow-strong: rgba(13, 110, 253, 0.5);
          --border-radius: 8px;
          --transition: 0.3s ease;
          font-size: 16px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        /* Fade-in animation */
        .fade-in {
          animation: fadeIn 0.7s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }

        /* Spinner container */
        .spinner-container, .processing-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60vh;
          flex-direction: column;
        }

        /* Spinner */
        .spinner {
          width: 48px;
          height: 48px;
          border: 5px solid var(--bg-color);
          border-top: 5px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 12px var(--primary-color);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Wrapper */
        .payment-wrapper {
          max-width: 480px;
          margin: 40px auto;
          padding: 30px 40px;
          background-color: var(--bg-color);
          border-radius: var(--border-radius);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          color: var(--text-color);
          text-align: center;
          user-select: none;
        }

        /* Title */
        .title {
          font-weight: 700;
          font-size: 2.2rem;
          margin-bottom: 10px;
          color: var(--primary-color);
        }

        /* Product Info */
        .product-info {
          margin-bottom: 30px;
          font-size: 1.1rem;
          line-height: 1.5;
        }
        .product-info strong {
          color: var(--primary-color);
        }
        .product-image {
          max-width: 220px;
          margin: 20px 0;
          border-radius: var(--border-radius);
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          object-fit: contain;
        }
        .price {
          font-weight: 600;
          font-size: 1.3rem;
          color: #2c3e50;
        }

        /* Form */
        .payment-form {
          text-align: left;
          font-size: 1rem;
        }
        .label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #34495e;
        }
        .select {
          width: 100%;
          padding: 12px 14px;
          border-radius: var(--border-radius);
          border: 1.5px solid var(--input-border);
          background-color: var(--input-bg);
          font-size: 1rem;
          transition: border-color var(--transition), box-shadow var(--transition);
          box-sizing: border-box;
          outline-offset: 2px;
          cursor: pointer;
        }
        .select:focus {
          border-color: var(--input-focus);
          box-shadow: 0 0 8px var(--shadow-light);
          outline: none;
        }

        /* Card inputs */
        .card-details {
          margin-top: 20px;
        }
        .input {
          width: 100%;
          padding: 14px 16px;
          margin-bottom: 16px;
          border-radius: var(--border-radius);
          border: 1.5px solid var(--input-border);
          background-color: var(--input-bg);
          font-size: 1rem;
          transition: border-color var(--transition), box-shadow var(--transition);
          box-sizing: border-box;
          outline-offset: 2px;
        }
        .input:focus {
          border-color: var(--input-focus);
          box-shadow: 0 0 8px var(--shadow-light);
          outline: none;
        }
        .half-inputs {
          display: flex;
          gap: 12px;
        }
        .half {
          flex: 1;
        }

        /* Sections */
        .qr-section, .emi-section, .wallet-section {
          margin-top: 20px;
          color: #4b5563;
          font-size: 1rem;
        }
        .qr-image {
          margin-top: 14px;
          width: 150px;
          border-radius: var(--border-radius);
          box-shadow: 0 6px 15px rgba(0,0,0,0.12);
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        /* Button */
        .pay-button {
          margin-top: 30px;
          width: 100%;
          padding: 16px 0;
          background: linear-gradient(90deg, #0d6efd 0%, #0b5ed7 100%);
          border: none;
          border-radius: var(--border-radius);
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          box-shadow: 0 8px 20px var(--shadow-strong);
          transition: background-color var(--transition), transform 0.15s ease-in-out;
          user-select: none;
        }
        .pay-button:hover:not(:disabled) {
          background: linear-gradient(90deg, #0b5ed7 0%, #0d6efd 100%);
          transform: scale(1.03);
          box-shadow: 0 12px 25px var(--shadow-strong);
        }
        .pay-button:active:not(:disabled) {
          transform: scale(0.97);
          box-shadow: 0 6px 12px var(--shadow-light);
        }
        .pay-button:disabled {
          background: #a6c8ff;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* No product message */
        .no-product-message {
          margin: 100px auto;
          font-size: 1.2rem;
          text-align: center;
          color: #888;
          font-style: italic;
        }

        /* Processing text */
        .processing-text {
          margin-top: 12px;
          font-weight: 600;
          color: var(--primary-color);
          font-size: 1.1rem;
        }
      `}</style>
    </main>
  );
};

export default PaymentPage;
