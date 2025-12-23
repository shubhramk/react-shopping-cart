import type { Category } from './category.types';
export interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}