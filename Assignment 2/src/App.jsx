
import React, { useState } from "react";
import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Premium Watch",
    price: 4999,
    category: "Accessories",
    rating: "4.8",
    badge: "POPULAR",
    description: "Elegant design for your everyday style.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 2999,
    category: "Electronics",
    rating: "4.7",
    badge: "BEST SELLER",
    description: "Enjoy immersive sound and wireless freedom.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
  {
    id: 3,
    name: "Minimal Backpack",
    price: 1899,
    category: "Lifestyle",
    rating: "4.6",
    badge: "TRENDING",
    description: "A practical backpack for everyday adventures.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 3499,
    category: "Footwear",
    rating: "4.9",
    badge: "NEW",
    description: "Lightweight comfort for your daily movement.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  function handleAddToCart(product) {
    setCartCount((count) => count + 1);
    setMessage(`${product.name} added to cart!`);
  }

  function handleFormChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleAddProduct(event) {
    event.preventDefault();

    const newProduct = {
      ...form,
      id: Date.now(),
      price: Number(form.price),
      rating: "4.5",
      badge: "NEW",
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    };

    setProducts((current) => [newProduct, ...current]);

    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });

    setSearch("");
    setMessage("Your product was added successfully!");

    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="store">
      <header className="store-header">
        <a className="brand" href="#">
          Nova<span>Store.</span>
        </a>

        <nav>
          <a href="#products">Products</a>
          <a href="#add-product">Add Product</a>
        </nav>

        <div className="cart">
          🛍️ Cart <strong>{cartCount}</strong>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">DISCOVER YOUR NEXT FAVORITE</p>

            <h1>
              Good products.
              <br />
              <span>Better everyday.</span>
            </h1>

            <p className="hero-description">
              Explore our collection of everyday essentials,
              designed to make life a little better.
            </p>

            <a className="hero-button" href="#products">
              Explore Collection →
            </a>

            <p className="hero-note">
              ✦ A React practice project built with reusable UI ideas
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-circle">N.</div>
            <div className="hero-floating-card">
              <span>✦ CURATED FOR YOU</span>
              <h3>Simple choices. Great style.</h3>
              <p>Find something you love.</p>
            </div>
          </div>
        </section>

        <section id="products" className="products-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">THE NOVASTORE COLLECTION</p>
              <h2>Featured Products</h2>
              <p>Thoughtful essentials for your everyday life.</p>
            </div>

            <input
              className="search"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search products"
            />
          </div>

          {message && (
            <div className="status-message" role="status">
              {message}
              <button
                type="button"
                onClick={() => setMessage("")}
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          )}

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />
                    <span className="product-badge">
                      {product.badge}
                    </span>
                  </div>

                  <div className="product-details">
                    <p className="product-category">
                      {product.category}
                    </p>

                    <div className="product-title-row">
                      <h3>{product.name}</h3>
                      <span className="rating">
                        ★ {product.rating}
                      </span>
                    </div>

                    <p className="product-description">
                      {product.description}
                    </p>

                    <div className="product-bottom">
                      <strong className="product-price">
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>

                      <button
                        className="add-cart-button"
                        type="button"
                        onClick={() => handleAddToCart(product)}
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <h3>No products found</h3>
                <p>Try another name or category.</p>
                <button
                  type="button"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          <p className="product-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </section>

        <section id="add-product" className="add-product-section">
          <div className="form-intro">
            <p className="eyebrow">YOUR IDEAS, YOUR COLLECTION</p>
            <h2>Add a Product</h2>
            <p>
              Practice React state and controlled inputs by adding
              your own product to the collection.
            </p>

            <ul>
              <li>✓ React useState</li>
              <li>✓ Form handling</li>
              <li>✓ Dynamic rendering</li>
              <li>✓ Search and filtering</li>
            </ul>
          </div>

          <form className="product-form" onSubmit={handleAddProduct}>
            <label htmlFor="product-name">Product name</label>
            <input
              id="product-name"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="e.g. Classic T-shirt"
              required
            />

            <div className="form-row">
              <div>
                <label htmlFor="product-price">Price (₹)</label>
                <input
                  id="product-price"
                  name="price"
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={handleFormChange}
                  placeholder="999"
                  required
                />
              </div>

              <div>
                <label htmlFor="product-category">Category</label>
                <input
                  id="product-category"
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  placeholder="Fashion"
                  required
                />
              </div>
            </div>

            <label htmlFor="product-image">Image URL (optional)</label>
            <input
              id="product-image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleFormChange}
              placeholder="https://example.com/image.jpg"
            />

            <label htmlFor="product-description">Description</label>
            <textarea
              id="product-description"
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Describe your product..."
              rows="3"
              required
            />

            <button className="submit-button" type="submit">
              Add Product to Store →
            </button>
          </form>
        </section>
      </main>

      <footer className="store-footer">
        <a className="brand footer-brand" href="#">
          Nova<span>Store.</span>
        </a>
        <p>Built with React · Components · Props · State</p>
        <p>© {new Date().getFullYear()} NovaStore Practice Project</p>
      </footer>
    </div>
  );
}

export default App;
