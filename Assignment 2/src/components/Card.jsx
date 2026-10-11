import Button from "./Button";

const Card = ({ product, onAddToCart }) => {

    return (
        <article className="product-card">

            <div className="product-image">
                <img
                    src={product.image}
                    alt={product.name}
                />

                {product.badge && (
                    <span className="product-badge">
                        {product.badge}
                    </span>
                )}
            </div>

            <div className="product-content">

                <p className="category">
                    {product.category}
                </p>

                <h3>{product.name}</h3>

                <p className="description">
                    {product.description}
                </p>

                <div className="rating">
                    ⭐ {product.rating}
                </div>

                <div className="product-bottom">

                    <div className="price">
                        ₹{product.price}
                    </div>

                    <Button
                        onClick={() => onAddToCart(product)}
                    >
                        Add to Cart
                    </Button>

                </div>

            </div>

        </article>
    );
};

export default Card;