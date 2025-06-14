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
  
  Text
} from "recharts";
import { format } from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Analyze = () => {
  const [salesData, setSalesData] = useState([]);
  const [productCounts, setProductCounts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      id: "sales",
      title: "Sales Trend",
      value: salesData.reduce((sum, day) => sum + day.total, 0).toLocaleString(),
      prefix: "$",
      color: "#4f46e5"
    },
    {
      id: "products",
      title: "All Products",
      value: productCounts.reduce((sum, product) => sum + product.quantity, 0).toLocaleString(),
      suffix: " units",
      color: "#10b981"
    },
    {
      id: "top",
      title: "Top Products",
      value: topProducts.length,
      suffix: " products",
      color: "#f59e0b"
    }
  ];

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

            const productName = payment.productName || "Unknown";
            if (!productMap[productName]) {
              productMap[productName] = 0;
            }
            productMap[productName] += 1;
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
      setLoading(false);
    });
  }, []);

  const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <Text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          fontSize={12}
          angle={-45}
        >
          {payload.value}
        </Text>
      </g>
    );
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="spinner"></div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <h2>Sales Analytics Dashboard</h2>
        <p className="last-updated">Last updated: {format(new Date(), "MMMM d, yyyy h:mm a")}</p>
      </header>

      <div className="carousel-container">
        <button className="nav-button prev" onClick={prevCard}>
          <FiChevronLeft size={24} />
        </button>
        
        <div className="carousel-track">
          {cards.map((card, index) => (
            <div 
              className={`analytics-card ${index === currentIndex ? 'active' : ''}`}
              key={card.id}
              style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
              <div className="card-header">
                <h3>{card.title}</h3>
                <div className="card-value" style={{ color: card.color }}>
                  {card.prefix}{card.value}{card.suffix}
                </div>
              </div>

              {index === 0 && (
                <div className="chart-container">
                  {salesData.length === 0 ? (
                    <div className="no-data">
                      <p>No sales data available</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" tick={{ fill: '#666' }} tickMargin={10} />
                        <YAxis 
                          tick={{ fill: '#666' }}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, "Total Sales"]}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="total" 
                          stroke={card.color} 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6, stroke: card.color, strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              )}

              {index === 1 && (
                <div className="chart-container">
                  {productCounts.length === 0 ? (
                    <div className="no-data">
                      <p>No product sales found</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={productCounts}
                        margin={{ bottom: 100, right: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="name" 
                          height={120}
                          tick={<CustomizedAxisTick />}
                        />
                        <YAxis tick={{ fill: '#666' }} />
                        <Tooltip 
                          formatter={(value) => [value, "Quantity Sold"]}
                          labelFormatter={(label) => `Product: ${label}`}
                        />
                        <Bar 
                          dataKey="quantity" 
                          fill={card.color} 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              )}

              {index === 2 && (
                <div className="chart-container">
                  {topProducts.length === 0 ? (
                    <div className="no-data">
                      <p>No product ranking available</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topProducts}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: '#666' }} tickMargin={10} />
                        <YAxis tick={{ fill: '#666' }} />
                        <Tooltip 
                          formatter={(value) => [value, "Quantity Sold"]}
                          labelFormatter={(label) => `Product: ${label}`}
                        />
                        <Bar 
                          dataKey="quantity" 
                          fill={card.color} 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="nav-button next" onClick={nextCard}>
          <FiChevronRight size={24} />
        </button>
      </div>

      <div className="carousel-dots">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Analyze;

// CSS Styles
const styles = `
  .analytics-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1f2937;
  }

  .analytics-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .analytics-header h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
  }

  .last-updated {
    color: #6b7280;
    font-size: 0.875rem;
  }

  .carousel-container {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
  }

  .carousel-track {
    display: flex;
    overflow: hidden;
    width: 100%;
    border-radius: 16px;
  }

  .analytics-card {
    min-width: 100%;
    transition: transform 0.5s ease;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 2rem;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .card-header h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }

  .card-value {
    font-size: 1.25rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.02);
  }

  .chart-container {
    margin-top: 1.5rem;
    height: 350px;
  }

  .no-data {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    font-size: 1rem;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s ease;
  }

  .nav-button:hover {
    background: #f9fafb;
    transform: translateY(-50%) scale(1.05);
  }

  .prev {
    left: -24px;
  }

  .next {
    right: -24px;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 0.5rem;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d1d5db;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .dot.active {
    background: #4f46e5;
    transform: scale(1.2);
  }

  .analytics-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-left-color: #4f46e5;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .analytics-container {
      padding: 1rem 0.5rem;
    }

    .analytics-card {
      padding: 1.5rem;
    }

    .card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .card-value {
      align-self: flex-end;
    }

    .nav-button {
      width: 36px;
      height: 36px;
    }

    .prev {
      left: -18px;
    }

    .next {
      right: -18px;
    }
  }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);