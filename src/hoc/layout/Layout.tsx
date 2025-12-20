import React, { type ReactNode } from "react";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{ minHeight: "100vh"}}>
            <header>
                <h1 style={{ margin: 0, fontSize: "1.125rem" }}>React Shopping Cart</h1>
                <nav>
                    <a href="/" style={{ marginRight: 12, color: "#333", textDecoration: "none" }}>
                        Home
                    </a>
                    <a href="/cart" style={{ color: "#333", textDecoration: "none" }}>
                        Cart
                    </a>
                </nav>
            </header>

            <main>{children}</main>

            <footer
                style={{
                    padding: "0.75rem 1.25rem",
                    borderTop: "1px solid #e6e6e6",
                    textAlign: "center",
                    background: "#fafafa",
                }}
            >
                © {new Date().getFullYear()} React Shopping Cart
            </footer>
        </div>
    );
};

export default Layout;