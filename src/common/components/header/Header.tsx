import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import SearchBar from "../search/Search";
import UserMenu from "../user-menu/UserMenu";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.list);

  const productCount = cartItems.length;
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="FoodMart" className="h-10 w-auto" />
      </div>

      {/* Search */}
      <div className="hidden lg:flex flex-1 justify-center px-8">
        <SearchBar />
      </div>

      {/* User & Cart */}
      <div className="flex items-center gap-6 relative">
        <UserMenu />

        {/* Cart */}
        <div
          className="relative flex items-center cursor-pointer"
          onClick={() => navigate("/cart-info")}
        >
          <ShoppingCart size={28} className="text-gray-700 hover:text-blue-900 transition" />

          {/* Floating badge */}
          {productCount > 0 && (
            <div className="absolute -top-4 -right-4 flex items-center gap-1 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg z-50">
              <span>{productCount}</span>
              <span>|</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          )}

          {/* "Your Cart" text */}
          <span className="ml-3 text-gray-700 font-medium hover:text-blue-900 transition hidden lg:inline-block">
            Your Cart
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
