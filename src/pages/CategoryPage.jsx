import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./category.css";

const dummyCategoryProducts = {
  Mobiles: [
    { name: "iPhone 14", brand: "Apple", price: 79999, img: "https://m.media-amazon.com/images/I/61cwywLZR-L._SX679_.jpg" },
    { name: "Samsung Galaxy S22", brand: "Samsung", price: 69999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5x7kbFyH-kUx4HnmNQ91t9zckl6w41zUHrQ&s" },
    { name: "Nothing Phone 1", brand: "Nothing", price: 39999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBSOmWUmFSNQS4-r0HetgmU8uZRJ608k3Jqw&s" },
  ],
  Electronics: [
    { name: "Sony LED TV", brand: "Sony", price: 49999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfzNlYZR7_8VIdNItHJsChB2Lj6y6bdg3PQ&s" },
    { name: "JBL Bluetooth Speaker", brand: "JBL", price: 1499, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_CSPL_Umu_SLPMTG6buTNCpeSdfQn6PMNSA&s" },
    { name: "Philips LED Bulb", brand: "Philips", price: 1899, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeukqCzEK0uMFX7l3soOP8nGl6Z94bbHcHLg&s" },
  ],
  Fashion: [
    { name: "Puma T-Shirt", brand: "puma", price: 499, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKD8QB-s0SO2deEzmxzJfpBGjkW5Hcq14dRg&s" },
    { name: "Men's Pant", brand: "Levis", price: 1999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq0xV-xh_GNXfQVmCsRwOkwXr9iguMTe5bOg&s" },
    { name: "sweatshirt", brand: "H&M", price: 899, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8E3N7cn2CKyumgN6AopSVjlpQJF46VZ8QNA&s" },
  ],
  "Home Appliances": [
    { name: "Air Conditioner", brand:"Lollyd",price: 29999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2uNSj2Sn1p1Nokyg_SMiG0eZfOphxuVsOMA&s" },
    { name: "Microwave Oven", brand:"Samsung",price: 8999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtJ0_WMAto3JBRgvfTdBN0J6707UqFLJj3Q&s" },
    { name: "Refrigerator", brand:"LG",price: 25999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUx9bN1eWoW_2tTnZaPOH-zQQHIKjIArTG0g&s" },
  ],
   Books: [
     { name: "Atomic Habits", price: 599, brand: "Penguin", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpr68FDh6xxaWIwFmu5mm3bYd0zBc503i5Q&s" },
    { name: "The Psychology of Money", price: 399, brand: "Harriman House", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNiEUY9dmXOPdrRZSc-Uzi6Qk5GXUf7sucg&s" },
    { name: "Ikigai", price: 250,  brand: "Penguin", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzQ4pycumT-eihOXuWT3B8r_BwsrLVrWlyg&s" },
  ],
  "Beauty products": [
    { name: "Facial Cleanser", brand:"Cetaphil", price: 499, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRelu7vWR2Kzvg07jNJtgx8TyKpCMROQVpblw&s" },
    { name: "Soap", price: 799,  brand:"LUX",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qE-opWsX4GBSq_ZytwJqSaUiKRusN__WLA&s" },
    { name: "Moisturizer", price: 999, brand:"Mama Earth", img: "https://www.jiomart.com/images/product/original/492848024/pond-s-glycerin-vitamin-e-light-moisturizer-for-soft-glowing-skin-200-ml-product-images-o492848024-p591962562-0-202410011449.jpg?im=Resize=(420,420)" },
  ],
  "Dry fruits": [
     { name: "Almonds", brand:"NutRaj", price: 899, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTboksNhGzNTow__4-kQWH3OLuiwCZ7bk6MAA&s" },
    { name: "Cashew Nuts", price: 999, brand:"Gretel",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeK5LCuqlGF0-2jpK8C6PmK6Z-wpua3aHEVw&s" },
    { name: "Walnuts", price: 1099, brand:"Happilo",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ5rDUYeqDU_p0GDuHk7iWn9bv5TIi9vjMWg&s" },
  ],
  "Home Furnitures": [
    { name: "Sofa Set", price: 19999,brand:"Royalok", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRZDVh6kklPNEsj5U7pSdlfuq9fzCrEoH2fA&s" },
    { name: "Dining Table", price: 15999, brand:"Sun furniture",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG6e_zn4b-UyF9743JIErlKAhLlguZ41bxPQ&s" },
    { name: "Queen Bed", price: 24999, brand:"wooden twist",img: "https://damroimages.blob.core.windows.net/damroimages/9186-1.jpg" },
  ],
  Kilos: [
     { name: "Rice (5kg)", price: 599,brand:"India Gate", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpr68FDh6xxaWIwFmu5mm3bYd0zBc503i5Q&s" },
    { name: "Wheat Flour (5kg)", price: 399,brand:"Pathanjali", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNiEUY9dmXOPdrRZSc-Uzi6Qk5GXUf7sucg&s" },
    { name: "Sugar (5kg)", price: 250,brand:"Madhur", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzQ4pycumT-eihOXuWT3B8r_BwsrLVrWlyg&s" },
  ],
   "Toys and More": [
     { name: "Remote Control Car", price: 599,brand:"cpt toys", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpr68FDh6xxaWIwFmu5mm3bYd0zBc503i5Q&s" },
    { name: "LEGO Classic Bricks Set", price: 399,brand: "LEGO", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNiEUY9dmXOPdrRZSc-Uzi6Qk5GXUf7sucg&s" },
    { name: "Rubik's Cube 3x3", price: 250,brand:"Funskool", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzQ4pycumT-eihOXuWT3B8r_BwsrLVrWlyg&s" },
  ],
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const products = dummyCategoryProducts[categoryName] || [];

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const brands = [...new Set(products.map(p => p.brand))];

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const navigate = useNavigate();

const handleBuyNow = (item) => {
  navigate("/payment", { state: { product: item } });
};

  const applyFilters = () => {
    let result = [...products];

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (priceRange) {
      if (priceRange === "low") result = result.filter(p => p.price < 10000);
      else if (priceRange === "mid") result = result.filter(p => p.price >= 10000 && p.price <= 50000);
      else if (priceRange === "high") result = result.filter(p => p.price > 50000);
    }

    setFilteredProducts(result);
  };

 
  

  const handleAddToCart = (item) => {
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="category-page-container">
      <aside className="filter-sidebar">
        <h3>Filters</h3>

        <div className="filter-section">
          <h4>Brand</h4>
          {brands.map((brand, idx) => (
            <label key={idx}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              {brand}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h4>Price</h4>
          <label><input type="radio" name="price" onChange={() => handlePriceChange("low")} /> Under ₹10,000</label>
          <label><input type="radio" name="price" onChange={() => handlePriceChange("mid")} /> ₹10,000 - ₹50,000</label>
          <label><input type="radio" name="price" onChange={() => handlePriceChange("high")} /> ₹50,000+</label>
        </div>

        <button className="btn apply-btn" onClick={applyFilters}>Apply Filters</button>
      </aside>

      <main className="category-products">
        <h2>{categoryName} Products</h2>
        <div className="product-grid1">
          {filteredProducts.length === 0 ? (
            <p>No matching products found.</p>
          ) : (
            filteredProducts.map((item, index) => (
              <div key={index} className="product-card">
                <img src={item.img} alt={item.name} />
                <h4>{item.name}</h4>
                <p>₹{item.price.toLocaleString()}</p>
                <div className="modal-buttons">
                  <button className="btn buy-btn" onClick={() => handleBuyNow(item)}>Buy Now</button>
                  <button className="btn cart-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
