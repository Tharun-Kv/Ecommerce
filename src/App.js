import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // 👈 Added Navigate
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Terms from "./pages/terms";
import Welcome from "./pages/welcome";
import Cart from "./pages/cart";
import CategoryPage from "./pages/CategoryPage";
import Payment from "./pages/payment";
import OrderConfirmed from "./pages/OrderConfirmed";
import Error404 from "./pages/Error404";
import TrackOrder from "./pages/TrackOrder";
import Layout from "./pages/Layout"; // ✅ import
import { SearchProvider } from "./pages/search";

const App = () => {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 👇 Redirect root path to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route element={<Layout />}>
            <Route path="/terms" element={<Terms />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/TrackOrder" element={<TrackOrder />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
            <Route path="/error-404" element={<Error404 />} />
          </Route>
        </Routes>
      </SearchProvider>
    </Router>
  );
};

export default App;
