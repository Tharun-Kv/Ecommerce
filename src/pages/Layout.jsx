import React from "react";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../pages/search"; 
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Layout = () => {
  // For now, empty arrays for demo; replace with real data or state
  const filteredProducts = [];    
  const filteredCategories = [];  
  const cart = [];                

  return (
    <SearchProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header receives filtered data and cart, but not search props */}
        <Header
          filteredProducts={filteredProducts}
          filteredCategories={filteredCategories}
          cart={cart}
        />

        {/* Main content */}
        <main style={{ flex: 1, padding: "3px" }}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </SearchProvider>
  );
};

export default Layout;
