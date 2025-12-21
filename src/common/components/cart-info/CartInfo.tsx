import { ChevronDown } from "lucide-react";

const CartInfo: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col items-end cursor-pointer">
      <div className="flex items-center text-sm text-gray-500">
        <span className="mr-1">Your Cart</span>
        <ChevronDown size={16} className="text-gray-500" />
      </div>
      <div className="font-bold text-lg">$1290.00</div>
    </div>
  );
};

export default CartInfo;
