import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import CartInfo from "../cart-info/CartInfo";
import SearchBar from "../search/Search";
import UserMenu from "../user-menu/UserMenu";

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2 cursor-pointer ">
        <img src={logo} alt="FoodMart" className="h-10 w-auto" onClick={() => navigate("/")} />
      </div>
      <div className="hidden lg:flex flex-1 justify-center px-8">
        <SearchBar />
      </div>
      <div className="flex items-center gap-6">
        <UserMenu />
        <CartInfo />
      </div>
    </div>
  );
};

export default Header;
