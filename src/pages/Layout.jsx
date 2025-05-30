import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../pages/search";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const exampleCategories = [
  { name: "Mobiles", link: "/category/Mobiles" },
  { name: "Electronics", link: "/category/Electronics" },
  { name: "Fashion", link: "/category/Fashion" },
  { name: "Home Appliances", link: "/category/Home%20Appliances" },
  { name: "Books", link: "/category/Books" },
  { name: "Beauty products", link: "/category/Beauty%20products" },
  { name: "Dry fruits", link: "/category/dry%20fruits" },
  { name: "Home Furnitures", link: "/category/Home%20Furnitures" },
  { name: "Kilos", link: "/category/Kilos" },
  { name: "Toys and More", link: "/category/Toys" }
];

const exampleProducts = [
  { id: 101, name: "iPhone 14 Pro Max", image: "https://example.com/iphone14promax.jpg" },
  { id: 102, name: "Galaxy Buds Pro", image: "https://example.com/galaxybudspro.jpg" },
];

const Layout = () => {
  const [filteredCategories] = useState(exampleCategories);
  const [filteredProducts] = useState(exampleProducts);
  const [cart] = useState([]);

  return (
    <SearchProvider>
      <div style={{ paddingTop: "70px" }}>
        {/* Fixed Header */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            height: "70px",
          }}
        >
          <Header
            filteredProducts={filteredProducts}
            filteredCategories={filteredCategories}
            cart={cart}
          />
        </div>

        {/* Scrollable Content including Footer */}
        <main>
          <Outlet />
          <Footer />
        </main>
      </div>
    </SearchProvider>
  );
};

export default Layout;
