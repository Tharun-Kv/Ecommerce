import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SearchContext } from "../pages/search";
import "./Header.css";

const Header = ({ filteredProducts = [], filteredCategories = [], cart = [] }) => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { name: "Mobiles", link: "/category/Mobiles" },
    { name: "Electronics", link: "/category/Electronics" },
    { name: "Fashion", link: "/category/Fashion" },
    { name: "Home Appliances", link: "/category/Home%20Appliances" },
    { name: "Books", link: "/category/Books" },
    { name: "Beauty products", link: "/category/Beauty%20products" },
    { name: "Dry fruits", link: "/category/Dry%20fruits" },
    { name: "Home Furnitures", link: "/category/Home%20Furnitures" },
    { name: "Kilos", link: "/category/Kilos" },
    { name: "Toys and More", link: "/category/Toys" },
  ];

  const filteredSuggestions = [...filteredProducts, ...filteredCategories]
    .filter((item) => item?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5);

  const handleSuggestionClick = (value) => {
    setSearchTerm(value);
    navigate("/search-results");
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) navigate("/search-results");
  };

  const AnimatedLink = ({ to, children }) => (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="nav-button1">
      <Link to={to} className="nav-link1">{children}</Link>
    </motion.div>
  );

  const BackButton = () => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="nav-button1"
      onClick={() => navigate(-1)}
      style={{ cursor: "pointer" }}
      aria-label="Go back"
      role="button"
      tabIndex={0}
    >
      ← Back
    </motion.div>
  );

  return (
    <header className="header1">
      <div className="logo1" onClick={() => navigate("/")}>Techverve Store</div>

      <div className="search-bar1">
        <img
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt="Search Icon"
          className="search-icon1"
          onClick={handleSearchSubmit}
        />
        <input
          type="text"
          placeholder="Search for products, brands, and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
        />
        {searchTerm && filteredSuggestions.length > 0 && (
          <>
            <span className="clear-search1" onClick={() => setSearchTerm("")}>×</span>
            <ul className="suggestion-dropdown1">
              {filteredSuggestions.map((item, idx) => (
                <li key={idx} onClick={() => handleSuggestionClick(item.name)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="nav-links1">
        <div
          className="category-wrapper1"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <AnimatedLink to="#">Category</AnimatedLink>
          {showDropdown && (
            <ul className="category-dropdown1">
              {categories.map((cat, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(cat.link)}
                >
                  {cat.name}
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <BackButton />

        <AnimatedLink to="/cart" state={{ cart }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="Cart"
            className="icon1"
          />
        </AnimatedLink>

        <div className="user-dropdown-wrapper1" ref={userRef}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="nav-button1"
            onClick={() => setShowUserDropdown((prev) => !prev)}
          >
            <div className="user-icon1">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
                alt="User Icon"
                className="icon1"
              />
            </div>
          </motion.div>

          {showUserDropdown && (
            <ul className="user-dropdown1">
              <li onClick={() => navigate("/profile")}>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" />
                Profile
              </li>
              <li onClick={() => navigate("/t")}>
                <img src="https://cdn-icons-png.flaticon.com/512/2099/2099058.png" alt="Settings" />
                Settings
              </li>
               <li  onClick={() => navigate("/orderhistory")}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscX5q_zUqu8GaSJySuxFQrNPsXWWJdamZOA&s" alt="Order History"/>
              Order history
            </li>
              <li
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png" alt="Logout" />
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
