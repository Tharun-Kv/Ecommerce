import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Terms from "./pages/terms";
import Welcome from"./pages/welcome";
import Cart from "./pages/cart";
import CategoryPage from "./pages/CategoryPage";
import Payment from"./pages/payment";
import OrderConfirmed from "./pages/OrderConfirmed";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/terms" element={<Terms />} />
        <Route path="/cart" element={<Cart />} />
<Route path="/category/:categoryName" element={<CategoryPage />} />
               <Route path="/payment" element={<Payment />} />
  <Route path="/order-confirmed" element={<OrderConfirmed />} /> {/* ✅ This route must be added */}



      </Routes>
    </Router>
  );
};

export default App;
