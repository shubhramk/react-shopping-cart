import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import SearchBar from "../search/Search";
import UserMenu from "../user-menu/UserMenu";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { CartService } from "../../../common/services/cart.service";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState<number>(0);

  // Function to calculate total
  const calculateTotal = () => {
    const cartItems = CartService.getCart();
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setCartTotal(total);
  };

  // Run on mount and whenever cart changes
  useEffect(() => {
    calculateTotal();

    // Optional: Listen to cart updates if you have an event system
    const interval = setInterval(calculateTotal, 500); // Polling method
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white">
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src={logo}
          alt="FoodMart"
          className="h-10 w-auto"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="hidden lg:flex flex-1 justify-center px-8">
        <SearchBar />
      </div>

      <div className="flex items-center gap-6">
        <UserMenu />

        <div className="hidden lg:flex flex-col items-end cursor-pointer">
          <div
            className="flex items-center text-sm text-gray-500"
            onClick={() => navigate("/cart-info")}
          >
            <span className="mr-1">Your Cart</span>
            <button className="flex items-center gap-1 cursor-pointer">
              <ChevronDown size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="font-bold text-lg text-blue-900">
            ${cartTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
