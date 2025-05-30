import React, { useContext } from "react";
import { SearchContext } from "./search";

const SearchResults = ({ filteredProducts = [], filteredCategories = [] }) => {
  const { searchTerm } = useContext(SearchContext);

  const lowerSearch = searchTerm.toLowerCase();

  const matchingProducts = filteredProducts.filter((product) =>
    product?.name?.toLowerCase().includes(lowerSearch)
  );

  const matchingCategories = filteredCategories.filter((category) =>
    category?.name?.toLowerCase().includes(lowerSearch)
  );

  const hasResults = matchingProducts.length > 0 || matchingCategories.length > 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for: <em>{searchTerm}</em></h2>

      {!hasResults && (
        <p>No products or categories found matching your search.</p>
      )}

      {matchingCategories.length > 0 && (
        <>
          <h3>Categories</h3>
          <ul>
            {matchingCategories.map((cat, index) => (
              <li key={index}>{cat.name}</li>
            ))}
          </ul>
        </>
      )}

      {matchingProducts.length > 0 && (
        <>
          <h3>Products</h3>
          <ul>
            {matchingProducts.map((prod, index) => (
              <li key={index}>{prod.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchResults;
