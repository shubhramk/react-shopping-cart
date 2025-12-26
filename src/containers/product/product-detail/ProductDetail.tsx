import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import ProductQuantity from "../product-card/ProductQuantity";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { ProductItem } from "../../../models/product-item.model";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = useSelector((state: RootState) => {
    return state?.products.list.find(
      (product: ProductItem) => Number(product.id) === Number(id)
    );
  });
  const [activeImage, setActiveImage] = useState<string>(product?.images?.[0] || "");
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const totalPrice = product ? product.price * quantity : 0;

  if (loading) {
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
  }

  if ((error || !product) && !loading) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Product not available
        </h2>
        <p className="text-gray-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-900 cursor-pointer"
          >
            <CircleArrowLeft /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg mb-4">
              <img
                src={activeImage || product?.images?.[0]}
                alt={product?.title}
                className="max-h-full object-contain"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {product?.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-lg p-1 min-w-[70px] h-[70px] flex items-center justify-center transition
                  ${
                    activeImage === img
                      ? "border-blue-900"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title}-${index}`}
                    className="h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {product?.title}
            </h1>

            <p className="text-xl font-semibold text-blue-900 mb-4">
              ${totalPrice.toFixed(2)}
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product?.description}
            </p>

            <div className="mb-6">
              <span className="inline-block text-xs font-medium bg-gray-300 text-gray-700 border border-gray-700 px-3 py-2 rounded-full">
                {product?.category?.name}
              </span>
            </div>

            <div className="mt-6 pb-6 border-b">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Quantity
                </span>

                <ProductQuantity value={quantity} onChange={setQuantity} />
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                className="flex-1 border-2 border-blue-900 text-blue-900 py-3 rounded-lg
               font-semibold hover:bg-blue-900 hover:text-white transition"
              >
                Add to Cart
              </button>

              <button
                className="flex-1 bg-blue-900 text-white py-3 rounded-lg font-semibold
               hover:bg-blue-800 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
