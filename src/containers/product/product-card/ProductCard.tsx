import React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ProductItem } from "../../../models/product-item.model";

const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const navigate = useNavigate();
  const truncateText = (text: string, maxLength = 40) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div
      key={product.id}
      onClick={() => navigate(`/products/${product.id}`)}
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

      <div className="text-xs text-gray-800 mb-2">
        {truncateText(product.description)}{" "}
        {product.description.length > 40 && (
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-900 
                 hover:text-blue-700 transition-colors"
          >
            Read more
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-bold text-blue-900">
          ${product.price}
        </span>
      </div>

      <div className="mb-6">
        <span className="inline-block text-xs font-medium bg-gray-300 text-gray-700 border border-gray-700 px-3 py-2 rounded-full">
          {product.category.name}
        </span>
      </div>

      <button className="w-full text-sm font-medium border border-blue-900 text-blue-900 rounded-md py-2 hover:bg-blue-900 hover:text-white transition">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
