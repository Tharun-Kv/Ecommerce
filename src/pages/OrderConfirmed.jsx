import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  useEffect(() => {
    if (!product) navigate("/");
  }, [product, navigate]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <style>{`
        .checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: inline-block;
          border: 5px solid #00b894;
          position: relative;
        }
        .checkmark::after {
          content: '';
          position: absolute;
          left: 22px;
          top: 10px;
          width: 20px;
          height: 40px;
          border-right: 5px solid #00b894;
          border-bottom: 5px solid #00b894;
          transform: rotate(45deg);
          animation: draw 0.5s ease-out;
        }
        @keyframes draw {
          from { height: 0; width: 0; }
          to { height: 40px; width: 20px; }
        }
      `}</style>

      <div className="checkmark"></div>
      <h2 style={{ color: "#00b894", marginTop: 20 }}>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      {product && (
        <>
          <p><strong>Product:</strong> {product.name}</p>
          <p><strong>Amount:</strong> ₹{product.price}</p>
        </>
      )}
      <p style={{ marginTop: 20, fontSize: 14 }}>
        📧 A confirmation email has been sent to your registered email.
      </p>
    </div>
  );
};

export default OrderConfirmed;
