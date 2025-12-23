import React, { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import type { ProductItem } from "../../../models/product-item.model";
import { API_BASE_PATH } from "../../../common/constants/constants";
import { http } from "../../../common/services/http.service";


const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productList = ()=>{
    const path = `${API_BASE_PATH}/products`;
    http.get(path).then((response: {data: ProductItem[]})=>{
       setProducts(response.data);
    }).catch((err: any)=>{
     setError(err.message || "Something went wrong");
    }).finally(()=>{
      setLoading(false);
    });
  }

  useEffect(() => {
   /* const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();*/

    productList();
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
          <p className="text-gray-500">Please check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
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
              <ProductCard product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
