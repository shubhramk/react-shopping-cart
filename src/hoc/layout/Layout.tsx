import React, { type ReactNode } from "react";
import Header from "../../common/components/header/Header";
import { Outlet } from "react-router-dom";
// import Footer from "../../common/components/footer/Footer";
interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full bg-white shadow-md">
        <div className="container mx-auto px-4">
          <Header />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
