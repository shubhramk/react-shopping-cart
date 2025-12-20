import React, { type ReactNode } from "react";
import Header from "../../common/components/header/Header";
import Footer from "../../common/components/footer/Footer";
interface LayoutProps {
    children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{ minHeight: "100vh"}}>
            <Header />              

            <main>{children}</main>

            <Footer />
        </div>
    );
};

export default Layout;