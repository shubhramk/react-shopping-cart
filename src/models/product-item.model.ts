import type { Category } from "./category.model";

export interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}