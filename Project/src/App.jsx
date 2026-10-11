
import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import BlogCard from "./components/BlogCard.jsx";
import postsData from "./data/posts.json";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = Array.isArray(postsData) ? postsData : [];

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category))
  ];

  const featuredPost = posts.find((post) => post.featured);

  const matchesPost = (post) => {
    const text = [
      post.title,
      post.excerpt,
      post.author,
      post.category
    ].join(" ").toLowerCase();

    return (
      text.includes(search.trim().toLowerCase()) &&
      (activeCategory === "All" ||
        post.category === activeCategory)
    );
  };

  const filteredPosts = useMemo(() => {
    const result = posts.filter(
      (post) =>
        post.id !== featuredPost?.id &&
        matchesPost(post)
    );

    if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === "oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      result.sort((a, b) => a.readTime - b.readTime);
    }

    return result;
  }, [posts, search, activeCategory, sortOrder, featuredPost]);

  const showFeatured = featuredPost && matchesPost(featuredPost);

  const formatDate = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  return (
    <>
      <Header />

      <main id="home">
        <section className="hero-section">
          <div className="hero-inner">
            <p className="eyebrow">THE JOURNAL FOR CURIOUS MINDS</p>
            <h1>
              Ideas worth
              <br />
              <span>thinking about.</span>
            </h1>
            <p className="hero-description">
              Thoughtful stories on technology, creativity, lifestyle,
              and the little things that make life interesting.
            </p>
            <a href="#articles" className="hero-button">
              Discover our stories ↗
            </a>
            <p className="hero-note">
              Fresh perspectives, delivered with intention.
            </p>
          </div>
          <div className="hero-decoration" aria-hidden="true">
            <span>✳</span>
          </div>
        </section>

        {featuredPost && showFeatured && (
          <section className="featured-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">EDITOR'S PICK</p>
                <h2>A story to start with.</h2>
              </div>
              <span className="featured-number">01 / FEATURED</span>
            </div>

            <article className="featured-card">
              <button
                type="button"
                className="featured-image-button"
                onClick={() => setSelectedPost(featuredPost)}
                aria-label={`Read ${featuredPost.title}`}
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="featured-image"
                />
              </button>

              <div className="featured-content">
                <div className="card-meta-top">
                  <span className="category-label">
                    {featuredPost.category}
                  </span>
                  <span>{featuredPost.readTime} min read</span>
                </div>
                <h2>{featuredPost.title}</h2>
                <p className="featured-excerpt">{featuredPost.excerpt}</p>
                <div className="featured-bottom">
                  <div className="author-info">
                    <div className="author-avatar">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="author-name">{featuredPost.author}</p>
                      <p className="post-date">
                        {formatDate(featuredPost.date)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="read-link"
                    onClick={() => setSelectedPost(featuredPost)}
                  >
                    Read story →
                  </button>
                </div>
              </div>
            </article>
          </section>
        )}

        <section className="articles-section" id="articles">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE LATEST THINKING</p>
              <h2>Explore the journal.</h2>
              <p className="section-description">
                Ideas, perspectives, and stories selected for curious minds.
              </p>
            </div>
          </div>

          <div className="blog-toolbar">
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-button ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="blog-controls">
              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  placeholder="Search stories..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search blog posts"
                />
              </label>

              <select
                className="sort-select"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                aria-label="Sort articles"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="quick">Quick reads</option>
              </select>
            </div>
          </div>

          <div className="results-label">
            <span>
              {filteredPosts.length + (showFeatured ? 1 : 0)} STORIES
            </span>
            <span>GOOD IDEAS NEVER GO OUT OF STYLE.</span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onRead={setSelectedPost}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No stories found.</h3>
              <p>Try another search term or category.</p>
              <button
                type="button"
                className="hero-button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <div className="about-mark">i<span>&amp;</span>i.</div>
          <div className="about-copy">
            <p className="eyebrow">A LITTLE ABOUT US</p>
            <h2>
              A quieter corner
              <br />
              <span>of the internet.</span>
            </h2>
            <p>
              Ink &amp; Insight is a home for curious minds. We believe
              the best stories give you something new to think about.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#home" className="site-logo">
          ink<span>&amp;</span>insight<span className="logo-dot">.</span>
        </a>
        <p>Made for the curious. © {new Date().getFullYear()} Ink &amp; Insight.</p>
        <a href="#home">Back to top ↑</a>
      </footer>

      {selectedPost && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedPost(null)}
          role="presentation"
        >
          <article
            className="article-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedPost(null)}
              aria-label="Close article"
            >
              ×
            </button>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="modal-image"
            />
            <div className="modal-body">
              <p className="eyebrow">{selectedPost.category}</p>
              <h2 id="modal-title">{selectedPost.title}</h2>
              <p className="modal-byline">
                By {selectedPost.author} · {formatDate(selectedPost.date)}
              </p>
              <p>{selectedPost.excerpt}</p>
              <p className="modal-note">
                This is a preview. Full article content can be added to
                your JSON data in a future version.
              </p>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
