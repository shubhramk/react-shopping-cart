import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { CategoryService } from "../../services/category.service";
import type { Category } from "../product/types/category.types";

const SearchBar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | number>(
    "all"
  );

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await CategoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center bg-gray-100 p-3 rounded-full">
        <div className="hidden md:block w-1/4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
