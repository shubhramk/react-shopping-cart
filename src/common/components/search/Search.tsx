import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center bg-gray-100 p-3 rounded-full">
        <div className="hidden md:block w-1/4">
          <select className="w-full bg-transparent border-none outline-none text-sm">
            <option>All Categories</option>
            <option>Groceries</option>
            <option>Drinks</option>
            <option>Chocolates</option>
          </select>
        </div>

        <div className="flex-1 px-3">
          <input
            type="text"
            placeholder="Search for more than 20,000 products"
            className="w-full bg-transparent border-none outline-none text-sm"
          />
        </div>

        <div className="text-gray-500">
          <Search size={20} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
