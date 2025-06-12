import React, { useEffect, useState } from "react";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import { db, auth } from "./firebase-config";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderInvoice from "./OrderInvoice";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setError("Please sign in to view your orders");
          setLoading(false);
          return;
        }

        const userOrdersQuery = query(
          ref(db, "payments"),
          orderByChild("userId"),
          equalTo(currentUser.uid)
        );

        onValue(
          userOrdersQuery,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const ordersArray = Object.entries(data).map(([key, value]) => ({
                id: key,
                productName: value.productName || "Unknown Product",
                price: value.amount || 0,
                productImage:
                  value.productImage ||
                  "https://via.placeholder.com/150?text=No+Image",
                time: value.time || Date.now(),
                paymentMethod: value.method || "Unknown",
                userName: value.userName || "Customer",
              }));

              setOrders(ordersArray.reverse());
            } else {
              setOrders([]);
            }

            setLoading(false);
          },
          (error) => {
            setError("Failed to load your orders");
            setLoading(false);
            console.error("Error fetching orders:", error);
          }
        );
      } catch (err) {
        setError("Error initializing order fetch");
        setLoading(false);
        console.error("Error:", err);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <img
                src={order.productImage}
                alt={order.productName}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150?text=No+Image")
                }
              />
              <div style={{ flex: 1 }}>
                <h3>{order.productName}</h3>
                <p>Price: ₹{order.price}</p>
                <p>
                  Payment Method: <strong>{order.paymentMethod}</strong>
                </p>
                <p>
                  Order Time:{" "}
                  {new Date(order.time).toLocaleString("en-IN")}
                </p>
                <div style={{ marginTop: '1rem', zIndex: 1, position: 'relative' }}>
  <PDFDownloadLink
    document={<OrderInvoice order={order} />}
    fileName={`invoice_${order.id}.pdf`}
    style={{
      padding: "0.5rem 1rem",
      backgroundColor: "#4f46e5",
      color: "white",
      borderRadius: "6px",
      textDecoration: "none",
      cursor: "pointer",
      display: "inline-block",
    }}
  >
    {({ loading }) =>
      loading ? "Generating PDF..." : "📄 Download Invoice"
    }
  </PDFDownloadLink>
</div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
