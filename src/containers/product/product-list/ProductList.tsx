import React from "react";
import ProductCard from "../product-card/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, SearchX } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

const ProductList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const searchQuery = queryParams.get("search") || "";
  const categoryId = queryParams.get("category") || "";

  const { list, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const products = React.useMemo(() => {
    //throw new Error('Component crashed');
    let filtered = list;

    // 🔍 Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // 🗂 Category filter
    if (categoryId) {
      filtered = filtered.filter(
        (product) => Number(product.category?.id) === Number(categoryId)
      );
    }

    return filtered;
  }, [list, searchQuery, categoryId]);

  const SkeletonCard = () => (
    <div className="bg-white border rounded-xl p-4 shadow-sm animate-pulse">
      <div className="bg-gray-200 rounded-lg h-40 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-9 bg-gray-200 rounded" />
    </div>
  );

  if (error && !loading) {
    return ( 
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Unable to load products
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              {error || "Something went wrong while fetching the product list."}
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="rounded-full bg-blue-900 px-6 py-2 text-sm font-medium text-white hover:bg-blue-800 cursor-pointer transition"
              >
                Retry
              </button>

              <button
                onClick={() => navigate("/")}
                className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <SearchX className="h-8 w-8 text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No products available
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              We couldn’t find any products matching your selection. Try
              adjusting your filters or check back soon.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-full border border-blue-900 px-6 py-2 text-sm font-medium text-blue-900 hover:bg-blue-900 hover:text-white transition"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-25 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}

          {!loading &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
