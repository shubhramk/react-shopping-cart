import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import type { Category } from "../../../models/category.model";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchProducts } from "../../../store/products.slice";

const SearchBar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | number>(
    "all"
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useSelector((state: RootState) => {
     const uniqueMap = new Map<number, Category>();
      state?.products.list.forEach((product: { category: Category }) => {
        if (product.category && product.category.id) {
          uniqueMap.set(product.category.id, product.category);
        }
      });

      const categories = Array.from(uniqueMap.values());
      return categories;
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const categoryFromParams = query.get("category") || "all";
    const searchFromParams = query.get("search") || "";

    setSelectedCategory(categoryFromParams);
    if (inputRef.current) {
      inputRef.current.value = searchFromParams;
    }
  }, [location.search]);

  const updateParams = (search = "", category: string | number = "") => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category && category !== "all")
      params.set("category", category.toString());

    navigate(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);

    const currentSearch = inputRef.current?.value.trim() || "";

    updateParams(currentSearch, value);
  };

  const handleSearch = () => {
    const query = inputRef.current?.value.trim() || "";
    updateParams(query, selectedCategory);
  };


  useEffect(() => {
    dispatch(fetchProducts());
  },[]);


  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center bg-gray-100 p-3 rounded-full">
        <div className="hidden md:block w-1/4 relative">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="
              w-full bg-gray-100 text-sm font-medium text-gray-800
              px-4 py-2 rounded-full cursor-pointer appearance-none
              focus:outline-none hover:bg-gray-200 transition-colors
            "
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 px-3">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for more than 20,000 products"
            className="w-full bg-transparent border-none outline-none text-sm"
          />
        </div>

        <button
          onClick={handleSearch}
          className="text-gray-500 p-1 hover:text-blue-900 transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
