import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../pages/search";

const Header = ({ filteredProducts = [], filteredCategories = [], cart = [] }) => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const filteredSuggestions = [...filteredProducts, ...filteredCategories]
    .filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleSuggestionClick = (value) => {
    setSearchTerm(value);
    navigate("/search-results");
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>Ecommers</div>

      <div className="search-bar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt="Search Icon"
          className="search-icon-logo"
        />
        <input
          type="text"
          placeholder="Search for products, brands, and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/search-results");
            }
          }}
        />
        {searchTerm && filteredSuggestions.length > 0 && (
          <>
            <span className="clear-search" onClick={() => setSearchTerm("")}>×</span>
            <ul className="suggestion-dropdown">
              {filteredSuggestions.map((item, idx) => (
                <li key={idx} onClick={() => handleSuggestionClick(item.name)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="nav-links">
        <Link to="/login">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="Login Icon"
            className="login-icon"
          />
          Login
        </Link>
        <Link to="/cart" state={{ cart }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="Cart Logo"
            style={{ width: "20px", height: "20px", marginRight: "6px" }}
          />
          Cart
        </Link>
      </div>
    </header>
  );
};

export default Header;
