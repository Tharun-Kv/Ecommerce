import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../pages/firebase-config";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { format } from "date-fns";

const Analyze = () => {
  const [salesData, setSalesData] = useState([]);
  const [productCounts, setProductCounts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const paymentsRef = ref(db, "payments");

    onValue(paymentsRef, (snapshot) => {
      const data = snapshot.val();
      const grouped = {};
      const productMap = {};

      if (data) {
        Object.values(data).forEach((payment) => {
          if (payment.status === "completed" && payment.time) {
            const dateKey = format(new Date(payment.time), "yyyy-MM-dd");

            if (!grouped[dateKey]) {
              grouped[dateKey] = { date: dateKey, total: 0 };
            }

            const amount =
              typeof payment.amount === "string"
                ? parseFloat(payment.amount.replace(/,/g, ""))
                : payment.amount;

            grouped[dateKey].total += isNaN(amount) ? 0 : amount;

            // ✅ Product count using productName
            const productName = payment.productName || "Unknown";
            if (!productMap[productName]) {
              productMap[productName] = 0;
            }
            productMap[productName] += 1; // 1 per payment
          }
        });
      }

      const sortedSales = Object.values(grouped).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      const productList = Object.entries(productMap).map(
        ([name, quantity]) => ({
          name,
          quantity
        })
      );

      const top5 = [...productList]
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      setSalesData(sortedSales);
      setProductCounts(productList);
      setTopProducts(top5);
    });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sales Analytics</h2>

      {/* Total Sales */}
      <h3>Total Sales Over Time</h3>
      {salesData.length === 0 ? (
        <p>No data yet. Add payments with `time` and `productName`.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#0077b6" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Product Count */}
      <h3 style={{ marginTop: "3rem" }}>Products Sold Count</h3>
      {productCounts.length === 0 ? (
        <p>No product sales found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#00b4d8" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Top Products */}
      <h3 style={{ marginTop: "3rem" }}>Top 5 Most Sold Products</h3>
      {topProducts.length === 0 ? (
        <p>No product ranking available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#48cae4" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Analyze;
