import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-24 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Shop Everything You Need</h1>
        <p className="text-xl mb-6">
          Discover amazing products at your fingertips.
        </p>
        <button className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition" onClick={() => navigate("/products")}>
          Start Shopping
        </button>
      </section>

      {/* About / Info Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">About Our Shop</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We are building a seamless shopping experience for everyone. Explore and enjoy a wide range of products.
        </p>
      </section>
    </div>
  );
};

export default Home;
