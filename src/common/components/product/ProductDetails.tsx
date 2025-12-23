import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProductItem } from "./types/product.types";
import { ProductService } from "../../services/product.service";
import { CircleArrowLeft } from "lucide-react";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getByIdFromLocal(Number(id));
        console.log("Fetched product:", data);
        if (!data) {
          throw new Error("Product not found");
        }

        setProduct(data);
        setActiveImage(data.images?.[0] || "");
      } catch (err: any) {
        setError(err.message || "Unable to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (error || !product) {
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
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-900"
          >
            <CircleArrowLeft /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="bg-white border rounded-xl p-6">
            {/* Main Image */}
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg mb-4">
              <img
                src={activeImage}
                alt={product.title}
                className="max-h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto">
              {product.images?.map((img, index) => (
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
              {product.title}
            </h1>

            <p className="text-xl font-semibold text-blue-900 mb-4">
              ${product.price}
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <span className="inline-block text-xs font-medium bg-gray-300 text-gray-700 border border-gray-700 px-3 py-2 rounded-full">
                {product.category.name}
              </span>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 border border-blue-900 text-blue-900 py-3 rounded-md font-medium hover:bg-blue-900 hover:text-white transition">
                Add to Cart
              </button>

              <button className="flex-1 bg-blue-900 text-white py-3 rounded-md font-medium hover:bg-blue-800 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
