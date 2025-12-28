import React from "react";
const ProductLoader: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
        <div className="bg-gray-200 h-96 rounded-xl" />
        <div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </section>
  );
};

export default ProductLoader;
