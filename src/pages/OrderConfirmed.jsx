import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  useEffect(() => {
    if (!product) navigate("/Welcome");
  }, [product, navigate]);

  return (
     <div
    style={{
      padding: 20,
      textAlign: "center",
      backgroundImage: "url('https://cdn.dribbble.com/userupload/17750700/file/original-25b34b4b66de8e49c177862be96b9fb8.gif')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: "#fff"
    }}
  >
    <div style={{ position: "relative", minHeight: "100vh" }}>
  <div
    style={{
      position: "absolute",
      
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 0,
      inset: "-21px"
    }}
  />
  <div
    style={{
      position: "relative",
      zIndex: 1,
      padding: 20,
      textAlign: "center",
      color: "#fff"
    }}
  >
    

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
      
<button
  onClick={() => navigate("/Welcome")}
  style={{
    marginTop: 30,
    padding: "10px 20px",
    backgroundColor: "#00b894",
    border: "none",
    borderRadius: 5,
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.3s"
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#019875")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "#00b894")}
>
  Back to Home
</button>
    </div>
    </div>
    </div>
    </div>
  );
};

export default OrderConfirmed;
