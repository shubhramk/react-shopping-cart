import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartEmptyOrCheckout = ({ cartItems, checkout }: { cartItems: any[], checkout: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="py-2 px-4">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-gray-50 rounded-xl shadow-md space-y-4">
          <ShoppingCart className="w-16 h-16 text-gray-300" />
          <p className="text-gray-700 text-lg font-medium text-center">
            Your cart is empty.
          </p>
          <p className="text-gray-500 text-sm text-center">
            Add some items to proceed to checkout.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:from-blue-600 hover:to-purple-700 hover:scale-105 cursor-pointer transition-transform"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <button
          onClick={checkout}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg shadow-lg font-semibold hover:from-blue-600 hover:to-purple-700 hover:scale-105 cursor-pointer transition-transform"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartEmptyOrCheckout;
