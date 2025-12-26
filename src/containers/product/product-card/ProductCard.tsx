import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ProductCardProps } from "../../../models/product-item.model";
import ProductQuantity from "./ProductQuantity";
import { CartService } from "../../../common/services/cart.service";



const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);

  const truncateText = (text: string, maxLength = 40) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const handleAddToCart = () => {
    CartService.addToCart(product, quantity);
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div
        className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4 cursor-pointer"
        onClick={() => navigate(`/products/${product.id}`)}
      >
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
          ${(product.price * quantity).toFixed(2)}
        </span>
      </div>

      <div className="mb-6">
        <span className="inline-block text-xs font-medium bg-gray-300 text-gray-700 border border-gray-700 px-3 py-2 rounded-full">
          {product.category.name}
        </span>
      </div>

      <div className="mt-4 pb-4 flex items-center gap-3">
        <ProductQuantity value={quantity} onChange={setQuantity} />

        <button
          onClick={handleAddToCart}
          className="flex-1 h-10 rounded-lg border border-blue-900 text-blue-900
               text-sm font-semibold hover:bg-blue-900 hover:text-white transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
