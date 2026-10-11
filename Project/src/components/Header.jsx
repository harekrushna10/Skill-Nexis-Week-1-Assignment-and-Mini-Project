
export default function Header() {
  return (
    <header className="site-header">
      <a href="#home" className="site-logo" aria-label="Ink and Insight home">
        ink<span>&amp;</span>insight<span className="logo-dot">.</span>
      </a>

      <nav className="main-nav" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#articles">Articles</a>
        <a href="#about">About</a>
      </nav>

      <a className="header-cta" href="#articles">
        Explore stories <span>↗</span>
      </a>
    </header>
  );
}
