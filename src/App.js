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
import About from "./pages/about";
import Cancellationandrefund from "./pages/cancellationandrefund";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/orderhistory";
import Settings from  "./pages/t";
import AdminDashboard from "./pages/AdminDashboard";
import OrderInvoice from "./pages/OrderInvoice";
import Analyze from"./pages/Analyze";
const App = () => {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 👇 Redirect root path to login */}
         
           <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route element={<Layout />}>
           <Route path="/OrderInvoice" element={<OrderInvoice />} /> 
         <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/t" element ={<Settings />} />
           <Route path="/profile" element={<Profile />}  />
           <Route path="/cancellationandrefund" element={<Cancellationandrefund />}  />
          <Route path="/about" element={<About/>}  />
            <Route path="/terms" element={<Terms />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/TrackOrder" element={<TrackOrder />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
            <Route path="/error-404" element={<Error404 />} />
            <Route path="/Analyze" element={<Analyze />} />
          </Route>
        </Routes>
      </SearchProvider>
    </Router>
  );
};

export default App;
