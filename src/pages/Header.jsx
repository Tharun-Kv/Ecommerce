import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SearchContext } from "../pages/search";
import "./Header.css";

const Header = ({ filteredProducts = [], filteredCategories = [], cart = [] }) => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    { name: "Mobiles", link: "/category/Mobiles" },
    { name: "Electronics", link: "/category/Electronics" },
    { name: "Fashion", link: "/category/Fashion" },
    { name: "Home Appliances", link: "/category/Homeappliances" },
    { name: "Books", link: "/category/books" },
    { name: "Beauty products", link: "/category/Beauty-products" },
    { name: "Dry fruits", link: "/category/Dry-fruits" },
    { name: "Home Furnitures", link: "/category/Home-furnitures" },
    { name: "Kilos", link: "/category/Kilos" },
    { name: "Toys and More", link: "/category/Toys" },
  ];

  const filteredSuggestions = [...filteredProducts, ...filteredCategories]
    .filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleSuggestionClick = (value) => {
    setSearchTerm(value);
    navigate("/search-results");
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate("/search-results");
    }
  };

  const AnimatedLink = ({ to, children }) => (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="nav-button">
      <Link to={to} className="nav-link">{children}</Link>
    </motion.div>
  );

  const BackButton = () => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="nav-button"
      onClick={() => navigate(-1)}
      style={{ cursor: "pointer" }}
      aria-label="Go back to previous page"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(-1); }}
    >
      ← Back
    </motion.div>
  );

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>Ecommers</div>

      <div className="search-bar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt="Search Icon"
          className="search-icon"
          onClick={handleSearchSubmit}
        />
        <input
          type="text"
          placeholder="Search for products, brands, and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          aria-label="Search products, brands, and more"
        />
        {searchTerm && filteredSuggestions.length > 0 && (
          <>
            <span className="clear-search" onClick={() => setSearchTerm("")} role="button" aria-label="Clear search input" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSearchTerm(""); }}>
              ×
            </span>
            <ul className="suggestion-dropdown" role="listbox">
              {filteredSuggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSuggestionClick(item.name)}
                  aria-selected={false}
                  role="option"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSuggestionClick(item.name); }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="nav-links">
        <div
          className="category-wrapper"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <AnimatedLink to="#">Category</AnimatedLink>
          {showDropdown && (
            <ul className="category-dropdown">
              {categories.map((cat, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.location.href = cat.link}
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') window.location.href = cat.link; }}
                >
                  {cat.name}
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <BackButton />

        <AnimatedLink to="/login">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="Login Icon"
            className="icon"
          />
          Login
        </AnimatedLink>
        <AnimatedLink to="/cart" state={{ cart }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="Cart Logo"
            className="icon"
          />
          Cart
        </AnimatedLink>
      </div>
    </header>
  );
};

export default Header;
