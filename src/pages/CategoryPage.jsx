// /pages/CategoryPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./category.css";

const dummyCategoryProducts = {
   Mobiles: [
    { name: "iPhone 14", brand: "Apple", price: 79999, img: "https://m.media-amazon.com/images/I/61cwywLZR-L._SX679_.jpg",description: "The iPhone 14 features a stunning Super Retina XDR display, advanced dual-camera system, A15 Bionic chip, and improved battery life. It delivers powerful performance and seamless iOS experience." },
    { name: "Samsung Galaxy S22", brand: "Samsung", price: 69999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5x7kbFyH-kUx4HnmNQ91t9zckl6w41zUHrQ&s",description: "Samsung Galaxy S22 offers a brilliant AMOLED display, pro-grade camera system, and powerful Snapdragon processor. With a sleek design and long-lasting battery, it excels in performance and versatility."},
    { name: "Nothing Phone 1", brand: "Nothing", price: 39999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBSOmWUmFSNQS4-r0HetgmU8uZRJ608k3Jqw&s",description: "Nothing Phone 1 brings a unique transparent design with Glyph interface, smooth OLED display, dual camera, and powerful performance. It's a bold, innovative smartphone redefining Android aesthetics."},
  ],
  Electronics: [
    { name: "Sony LED TV", brand: "Sony", price: 49999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfzNlYZR7_8VIdNItHJsChB2Lj6y6bdg3PQ&s", description: "Sony LED TV delivers ultra-clear 4K visuals, immersive surround sound, and Android TV features. Enjoy cinematic experiences at home with vibrant colors and fast refresh rates for gaming." },
    { name: "JBL Bluetooth Speaker", brand: "JBL", price: 1499, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_CSPL_Umu_SLPMTG6buTNCpeSdfQn6PMNSA&s",description: "This JBL Bluetooth speaker is compact, portable, and powerful. With long battery life, waterproof design, and deep bass output, it’s perfect for travel, parties, and everyday use." },
    { name: "Philips LED Bulb", brand: "Philips", price: 1899, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeukqCzEK0uMFX7l3soOP8nGl6Z94bbHcHLg&s", description: "Philips LED bulb offers energy efficiency, long lifespan, and bright white light. It’s ideal for home lighting, reducing electricity bills while enhancing visibility and comfort in all spaces." },
  ],
  Fashion: [
    { name: "Puma T-Shirt", brand: "puma", price: 499, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKD8QB-s0SO2deEzmxzJfpBGjkW5Hcq14dRg&s" ,description: "This Puma T-Shirt is crafted from soft, breathable cotton for all-day comfort. Its minimalist design makes it ideal for casual outings or gym sessions, blending performance with urban fashion easily."},
    { name: "Men's Pant", brand: "Levis", price: 1999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq0xV-xh_GNXfQVmCsRwOkwXr9iguMTe5bOg&s",  description: "Levi's Men’s Pant offers a perfect fit with stretchable fabric, delivering style and ease. It's suitable for formal and casual occasions, making it a versatile staple in any wardrobe." },
    { name: "sweatshirt", brand: "H&M", price: 899, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8E3N7cn2CKyumgN6AopSVjlpQJF46VZ8QNA&s",  description: "This H&M sweatshirt features a soft fleece interior for cozy warmth, a classic fit, and ribbed cuffs. It’s ideal for layering in winter or wearing solo on chilly evenings." },
  ],
  "Home Appliances": [
    { name: "Air Conditioner", brand:"Lollyd",price: 29999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2uNSj2Sn1p1Nokyg_SMiG0eZfOphxuVsOMA&s",   description: "The Lollyd Air Conditioner cools rooms rapidly while conserving energy. With intelligent temperature control, it ensures consistent comfort even during hot summers, making it a must-have for modern households." },
    { name: "Microwave Oven", brand:"Samsung",price: 8999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtJ0_WMAto3JBRgvfTdBN0J6707UqFLJj3Q&s",  description: "Samsung’s Microwave Oven delivers fast, even cooking with smart presets. Its sleek design complements modern kitchens, while safety features and efficiency make it perfect for daily meal preparations." },
    { name: "Refrigerator", brand:"LG",price: 25999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUx9bN1eWoW_2tTnZaPOH-zQQHIKjIArTG0g&s",   description: "LG’s Refrigerator offers spacious compartments, inverter cooling technology, and energy-saving performance. With an elegant finish and quiet operation, it keeps food fresh longer while enhancing your kitchen’s aesthetics." },
  ],
   Books: [
     { name: "Atomic Habits", price: 599, brand: "Penguin", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpr68FDh6xxaWIwFmu5mm3bYd0zBc503i5Q&s",  description: "Atomic Habits by James Clear teaches practical techniques to form good habits, break bad ones, and master small behaviors that lead to remarkable results. It’s a must-read for self-growth." },
    { name: "The Psychology of Money", price: 399, brand: "Harriman House", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNiEUY9dmXOPdrRZSc-Uzi6Qk5GXUf7sucg&s",  description: "Atomic Habits by James Clear teaches practical techniques to form good habits, break bad ones, and master small behaviors that lead to remarkable results. It’s a must-read for self-growth." },
    { name: "Ikigai", price: 250,  brand: "ssep", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzQ4pycumT-eihOXuWT3B8r_BwsrLVrWlyg&s",  description: "This book explores how emotions and behavior affect our financial decisions. Morgan Housel's insights into wealth, greed, and happiness help readers develop a healthier, long-term mindset about money.",   }
   ],
  "Beauty products": [
    { name: "Facial Cleanser", brand:"Cetaphil", price: 499, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRelu7vWR2Kzvg07jNJtgx8TyKpCMROQVpblw&s",description: "Cetaphil’s Facial Cleanser gently removes dirt, oil, and makeup without irritating or drying out your skin. Dermatologist-recommended, it's ideal for all skin types and perfect for everyday use." },
    { name: "Soap", price: 799,  brand:"LUX",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qE-opWsX4GBSq_ZytwJqSaUiKRusN__WLA&s",description: "LUX soap combines fragrant essential oils with creamy lather for a luxurious bathing experience. It cleanses thoroughly, leaving your skin smooth, refreshed, and delicately perfumed after every wash." },
    { name: "Moisturizer", price: 999, brand:"Mama Earth", img: "https://www.jiomart.com/images/product/original/492848024/pond-s-glycerin-vitamin-e-light-moisturizer-for-soft-glowing-skin-200-ml-product-images-o492848024-p591962562-0-202410011449.jpg?im=Resize=(420,420)", description: "Mama Earth Moisturizer is enriched with natural ingredients like glycerin and Vitamin E. It hydrates dry skin deeply, locks in moisture, and provides long-lasting softness without leaving a greasy feeling." },
  ],
  "Dry fruits": [
     { name: "Almonds", brand:"NutRaj", price: 899, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTboksNhGzNTow__4-kQWH3OLuiwCZ7bk6MAA&s",description: "NutRaj Almonds are crunchy, nutrient-rich, and loaded with antioxidants. They're a great source of protein, fiber, and Vitamin E, perfect for snacking or adding to breakfast cereals and desserts." },
    { name: "Cashew Nuts", price: 999, brand:"Gretel",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeK5LCuqlGF0-2jpK8C6PmK6Z-wpua3aHEVw&s",description: "Gretel Cashew Nuts offer a rich, buttery flavor and are packed with healthy fats, minerals, and protein. Perfect for cooking, baking, or enjoying straight from the pack as a snack." },
    { name: "Walnuts", price: 1099, brand:"Happilo",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ5rDUYeqDU_p0GDuHk7iWn9bv5TIi9vjMWg&s", description: "Happilo Walnuts are premium quality, brain-boosting dry fruits filled with Omega-3 fatty acids. They support heart health and cognitive function, making them a smart addition to your daily diet." },
  ],
  "Home Furnitures": [
    { name: "Sofa Set", price: 19999,brand:"Royalok", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRZDVh6kklPNEsj5U7pSdlfuq9fzCrEoH2fA&s", description: "The Royalok Sofa Set offers plush seating with high-density foam and durable fabric. Its modern aesthetic and sturdy wooden frame make it a stylish and lasting addition to your living room." },
    { name: "Dining Table", price: 15999, brand:"Sun furniture",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG6e_zn4b-UyF9743JIErlKAhLlguZ41bxPQ&s", description: "Crafted from premium wood, this Sun Furniture Dining Table combines elegance with durability. Its spacious design comfortably seats six, perfect for family dinners or hosting guests in style." },
    { name: "Queen Bed", price: 24999, brand:"wooden twist",img: "https://damroimages.blob.core.windows.net/damroimages/9186-1.jpg", description: "The Wooden Twist Queen Bed features a solid hardwood frame and a sleek headboard. Designed for both comfort and durability, it's the centerpiece your bedroom deserves for restful nights." },
  ],
  Kilos: [
     { name: "Rice (5kg)", price: 599,brand:"India Gate", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpr68FDh6xxaWIwFmu5mm3bYd0zBc503i5Q&s",description: "India Gate Basmati Rice is long-grained, aromatic, and perfect for biryanis and daily meals. It cooks fluffy and non-sticky, providing high-quality nutrition and authentic taste with every delicious serving." },
    { name: "Wheat Flour (5kg)", price: 399,brand:"Pathanjali", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNiEUY9dmXOPdrRZSc-Uzi6Qk5GXUf7sucg&s",description: "Patanjali Wheat Flour is made from 100% whole grains using traditional stone grinding techniques. Rich in dietary fiber and essential nutrients, it ensures soft rotis and promotes digestive health naturally." },
    { name: "Sugar (5kg)", price: 250,brand:"Madhur", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzQ4pycumT-eihOXuWT3B8r_BwsrLVrWlyg&s",description: "Madhur Sugar is crystal-clear and made from superior-quality cane. It dissolves quickly and enhances the flavor of your beverages, desserts, and sweets while meeting the highest purity and hygiene standards." },
  ],
   "Toys and More": [
     { name: "Remote Control Car", price: 599,brand:"cpt toys", img: "https://images.jdmagicbox.com/comp/bangalore/e8/080pxx80.xx80.230711192913.v7e8/catalogue/cpt-toys-rmv-extension-2nd-stage-bangalore-toy-dealers-z7binljm6b-250.jpg?clr=#5a330c",description: "This CPT Toys Remote Control Car delivers high-speed performance with responsive controls. Featuring a sleek design and rechargeable battery, it's perfect for kids who love racing and outdoor excitement." },
    { name: "LEGO Classic Bricks Set", price: 399,brand: "LEGO", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNp1UENNrze5hLxbE15OBwhkwq511O2QR0AA&s", description: "The LEGO Classic Bricks Set inspires creativity with colorful pieces for endless building possibilities. Ideal for children and adults, it helps develop motor skills, imagination, and problem-solving through playful construction." },
    { name: "Rubik's Cube 3x3", price: 250,brand:"Funskool", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGSnoemSOIW7b92stk0ipFFUfu8SR9bw3CpQ&s", description: "Funskool’s Rubik's Cube 3x3 is a classic brain-teasing puzzle that sharpens memory and logic. Its smooth-turning design is perfect for beginners and speedcubers who love mental challenges and competition." },
  ],
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const products = useMemo(() => {
    return dummyCategoryProducts[categoryName] || [];
  }, [categoryName]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sliderPrice, setSliderPrice] = useState(100000);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {<div></div>
    let result = products.filter(
      (p) =>
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        p.price <= sliderPrice
    );
    setFilteredProducts(result);
  }, [selectedBrands, sliderPrice, products]);

  const brands = [...new Set(products.map((p) => p.brand))];

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };
  

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

 const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Added to cart!");
  };
  const handleBuyNow = (product) => {
    closeModal();
    navigate("/payment", { state: { product } });
  };

  return (
   <div className="category-page">
  <h2>{categoryName} Products</h2>

  <div className="category-layout"> {/* Flex container */}
    <div className="filters">
      <h4>Filter by Brand</h4>
      {brands.map((brand, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={brand}
            checked={selectedBrands.includes(brand)}
            onChange={() => handleBrandChange(brand)}
          />
          {brand}
        </label>
      ))}
      <div>
        <label>Price (up to ₹{sliderPrice}): </label>
        <input
          type="range"
          min="100"
          max="100000"
          value={sliderPrice}
          onChange={(e) => setSliderPrice(Number(e.target.value))}
        />
      </div>
    </div>

    <div className="product-grid">
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        filteredProducts.map((product, index) => (
          <div key={index} className="product-card" onClick={() => openModal(product)}>
            <img src={product.img} alt={product.name} />
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        ))
      )}
    </div>
  </div>


      {/* Modal */}
      {modalVisible && selectedProduct && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      
      {/* Image on the left */}
      <div className="modal-image">
        <img src={selectedProduct.img} alt={selectedProduct.name} />
      </div>

      {/* Info on the right */}
      <div className="modal-info">
        <h3>{selectedProduct.name}</h3>
        <p className="description">{selectedProduct.description}</p>
        <p><strong>Brand:</strong> {selectedProduct.brand}</p>
        <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
        <div className="button-group">
          <button className="btn buy-btn" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
          <button className="btn cart-btn" onClick={() => handleBuyNow(selectedProduct)}>Buy Now</button>
        </div>
      </div>

      <button className="close-btn" onClick={closeModal}>X</button>
    </div>
  </div>
)}

    </div>
  );
};

export default CategoryPage;

