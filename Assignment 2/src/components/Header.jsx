const Header = ({ cartCount }) => {

    return (
        <header className="header">

            <div className="container navbar">

                <a href="#" className="logo">
                    Nova<span>Store</span>
                </a>

                <nav>
                    <a href="#products">Products</a>
                    <a href="#add-product">Add Product</a>
                </nav>

                <div className="cart">
                    <span className="cart-icon">🛒</span>

                    <span className="cart-text">
                        Cart
                    </span>

                    <span className="cart-count">
                        {cartCount}
                    </span>
                </div>

            </div>

        </header>
    );
};

export default Header;