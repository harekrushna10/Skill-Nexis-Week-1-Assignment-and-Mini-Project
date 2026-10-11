
export default function BlogCard({ post, onRead }) {
  const formattedDate = new Date(
    `${post.date}T12:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <article className="blog-card">
      <button
        type="button"
        className="card-image-button"
        onClick={() => onRead(post)}
        aria-label={`Read ${post.title}`}
      >
        <img
          className="card-image"
          src={post.image}
          alt={post.title}
          loading="lazy"
        />
        <span className="image-arrow">↗</span>
      </button>

      <div className="card-content">
        <div className="card-meta-top">
          <span className="category-label">{post.category}</span>
          <span>{post.readTime} min read</span>
        </div>

        <button
          type="button"
          className="card-title-button"
          onClick={() => onRead(post)}
        >
          <h3>{post.title}</h3>
        </button>

        <p className="card-excerpt">{post.excerpt}</p>

        <div className="card-footer">
          <div className="author-info">
            <div className="author-avatar">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="author-name">{post.author}</p>
              <p className="post-date">{formattedDate}</p>
            </div>
          </div>

          <button
            type="button"
            className="read-link"
            onClick={() => onRead(post)}
          >
            Read <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
