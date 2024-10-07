import React, { useState } from 'react';
import laptop from "./laptop.jpg"
import smartphone from "./smartphone.jpg"
import headphone from "./headphone.jpg"
import tshirt from "./tshirt.jpg"
import jeans from "./jeans.jpg"
import sneakers from "./sneakers.jpg"

const products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', image: laptop },
  { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', image: smartphone },
  { id: 3, name: 'Headphones', price: 149.99, category: 'Electronics', image: headphone },
  { id: 4, name: 'T-shirt', price: 19.99, category: 'Clothing', image: tshirt },
  { id: 5, name: 'Jeans', price: 49.99, category: 'Clothing', image: jeans },
  { id: 6, name: 'Sneakers', price: 79.99, category: 'Footwear', image: sneakers },
];

const ProductCard = ({ product, addToCart }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card">
      {!imageError ? (
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          onError={handleImageError}
        />
      ) : (
        <div className="image-placeholder">{product.name}</div>
      )}
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

const Cart = ({ cart, removeFromCart, closeCart }) => (
  <div className="cart-modal">
    <div className="cart-content">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-button" onClick={closeCart}>×</button>
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  </div>
);

const ProductListingPage = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || product.category === categoryFilter)
  );

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="product-listing-page">
      <header>
        <h1>Product Listing</h1>
      </header>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        
        <button className="cart-button" onClick={() => setShowCart(true)}>
          Cart ({cart.length})
        </button>
      </div>
      
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {showCart && (
        <Cart cart={cart} removeFromCart={removeFromCart} closeCart={() => setShowCart(false)} />
      )}

      <style jsx>{`
        .product-listing-page {
          font-family: 'Arial', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        header {
          background-color: #333;
          color: white;
          padding: 20px;
          text-align: center;
          margin-bottom: 20px;
        }
        h1 {
          margin: 0;
        }
        .filters {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          background-color: white;
          padding: 15px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        input, select, .cart-button {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        input {
          flex-grow: 1;
          margin-right: 10px;
        }
        select {
          margin-right: 10px;
        }
        .cart-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .cart-button:hover {
          background-color: #45a049;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .product-card {
          background-color: white;
          border-radius: 5px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: transform 0.3s;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .image-placeholder {
          width: 100%;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f0f0f0;
          color: #666;
          font-size: 18px;
          margin-bottom: 10px;
          border-radius: 5px;
        }
        .category {
          color: #666;
          margin-bottom: 5px;
        }
        .price {
          font-weight: bold;
          margin: 10px 0;
          color: #4CAF50;
        }
        button {
          background-color: #008CBA;
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #007B9A;
        }
        .cart-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cart-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          max-width: 500px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #333;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .item-details h3 {
          margin: 0 0 5px 0;
        }
        .cart-total {
          margin-top: 20px;
          text-align: right;
          font-weight: bold;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default ProductListingPage;