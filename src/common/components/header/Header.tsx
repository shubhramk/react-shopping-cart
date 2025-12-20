const Header: React.FC = () => {
  return (
    <>
      <h1 style={{ margin: 0, fontSize: "1.125rem" }}>React Shopping Cart</h1>
      <nav>
        <a
          href="/"
          style={{ marginRight: 12, color: "#333", textDecoration: "none" }}
        >
          Home
        </a>
        <a href="/cart" style={{ color: "#333", textDecoration: "none" }}>
          Cart
        </a>
      </nav>
    </>
  );
};

export default Header;
