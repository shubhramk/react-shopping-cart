import React, { useEffect, useState } from "react";
import type { ProductItem } from "./types/product.types";

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://react-shop-backend-seven.vercel.app/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const SkeletonCard = () => (
    <div className="bg-white border rounded-xl p-4 shadow-sm animate-pulse">
      <div className="bg-gray-200 rounded-lg h-40 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-9 bg-gray-200 rounded" />
    </div>
  );

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Unable to load products
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h2>
          <p className="text-gray-500">
            Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Products
          </h2>
          <span className="text-sm text-blue-950 cursor-pointer hover:underline">
            View All
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}

          {!loading &&
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="h-full object-contain"
                  />
                </div>

                <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-blue-900">
                    ${product.price}
                  </span>
                </div>

                <button className="w-full text-sm font-medium border border-blue-900 text-blue-900 rounded-md py-2 hover:bg-blue-900 hover:text-white transition">
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
