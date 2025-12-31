import { Minus, Plus } from "lucide-react";
import { MAX_QTY, MIN_QTY } from "../../../common/constants/constants";

interface ProductQuantityProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  value,
  min = MIN_QTY,
  max = MAX_QTY,
  onChange,
}) => {
  return (
    <div className="flex items-center rounded-lg border bg-gray-50 px-2 py-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(value - 1, min))}
        disabled={value <= min}
        className="h-8 w-8 flex items-center justify-center rounded-md
                   text-gray-500 hover:bg-gray-200 disabled:opacity-40 cursor-pointer"
      >
        <Minus size={14} />
      </button>

      <span className="min-w-[32px] text-center text-sm font-semibold">
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(value + 1, max))}
        disabled={value >= max}
        className="h-8 w-8 flex items-center justify-center rounded-md
                   text-gray-500 hover:bg-gray-200 disabled:opacity-40 cursor-pointer"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

export default ProductQuantity;
