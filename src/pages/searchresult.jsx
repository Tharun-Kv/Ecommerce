import React, { useContext } from "react";
import { SearchContext } from "../pages/search";

const SearchResults = ({ products = [], categories = [] }) => {
  const { searchTerm } = useContext(SearchContext);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Search Results for "{searchTerm}"</h2>
      <h3>Products</h3>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id || product.name}>{product.name}</li>
        ))}
      </ul>
      <h3>Categories</h3>
      <ul>
        {filteredCategories.map((category) => (
          <li key={category.id || category.name}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
