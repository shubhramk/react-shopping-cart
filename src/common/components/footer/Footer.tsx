const Footer: React.FC = () => {
  return (
    <div
      style={{
        padding: "0.75rem 1.25rem",
        borderTop: "1px solid #e6e6e6",
        textAlign: "center",
        background: "#fafafa",
      }}
    >
      © {new Date().getFullYear()} React Shopping Cart
    </div>
  );
};

export default Footer;
