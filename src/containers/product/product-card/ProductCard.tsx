import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ProductCardProps } from "../../../models/product-item.model";
import ProductQuantity from "./ProductQuantity";
import { CartService } from "../../../common/services/cart.service";
import { MIN_QTY, MAX_QTY } from "../../../common/constants/constants";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  // ✅ Read quantity ONCE from cart
  const cartQty = CartService.getItemQuantity(product.id);

  /* This state manages the quantity of the product to be added to the cart */
  const [quantity, setQuantity] = useState<number>(
    cartQty > 0 ? cartQty : 1
  );
  const [isInCart, setIsInCart] = useState<boolean>(cartQty > 0);

  // ✅ Sync ONLY when product changes (not on quantity change)
  useEffect(() => {
    const qtyInCart = CartService.getItemQuantity(product.id);

    setIsInCart(qtyInCart > 0);
    setQuantity(qtyInCart > 0 ? qtyInCart : 1);
  }, [product.id]);

  //START - different approach using useReducer - START
  const quantityReducer = (state: { count: number }, action: { type: string }) => {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };

      case 'decrement':
        return { count: state.count - 1 };

      case 'reset':
        return { count: 0 };

      default:
        return state;
    }
  }
  const [quantityCnt, dispatch] = useReducer(quantityReducer, { count: 1 });
  //END - different approach using useReducer - END
  
  const truncateText = (text: string, maxLength = 40) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  // ✅ Add / Update cart with ABSOLUTE quantity
  const handleAddToCart = () => {
    CartService.addToCart(product, quantity);
    setIsInCart(true);
  };

  const unitPrice = product.price.toFixed(2);
  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div
      className={`relative rounded-xl p-1 transition-transform transform hover:scale-105 ${
        isInCart
          ? "bg-gradient-to-r from-blue-400 to-purple-600 shadow-xl"
          : "bg-gray-200"
      }`}
    >
      {/* Inner Card */}
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition relative">
        {/* Selected Badge */}
        {isInCart && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            In Cart
          </div>
        )}

        {/* Product Image */}
        <div
          className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4 cursor-pointer
                     border-b-2 border-gray-200 hover:border-blue-400 transition"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* Description */}
        <div className="text-xs text-gray-800 mb-3">
          {truncateText(product.description)}{" "}
          {product.description.length > 40 && (
            <Link
              to={`/products/${product.id}`}
              className="font-semibold text-blue-900 hover:text-blue-700 transition"
            >
              Read more
            </Link>
          )}
        </div>

        {/* Price Section */}
        <div className="mb-4 space-y-2">
          {/* Unit Price */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Unit price</span>
            <span className="font-semibold text-gray-800">
              ${unitPrice}
            </span>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600
                          text-white px-3 py-2 rounded-lg shadow-md">
            <span className="text-sm font-medium">Total</span>
            <span className="text-lg font-bold">${totalPrice}</span>
          </div>
        </div>

        {/* Category */}
        <div className="mb-5">
          <span className="inline-block text-xs font-medium bg-gray-300 text-gray-700
                           border border-gray-700 px-3 py-1 rounded-full">
            {product.category.name}
          </span>
        </div>

        {/* Quantity + Cart Action */}
        <div className="flex items-center gap-3">
          <ProductQuantity
            value={quantity}
            onQuantityChange={dispatch}
            onChange={(val) =>
              setQuantity(Math.max(MIN_QTY, Math.min(MAX_QTY, val)))
            }
          />

          <button
            onClick={handleAddToCart}
            className={`flex-1 h-10 rounded-lg border text-sm font-semibold cursor-pointer transition
              ${
                isInCart
                  ? "bg-blue-900 text-white border-blue-900 hover:bg-blue-800"
                  : "border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
              }`}
          >
            {isInCart ? "Update Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
