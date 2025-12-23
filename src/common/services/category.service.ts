import type { Category } from '../components/product/types/category.types';
import type { ProductItem } from '../components/product/types/product.types';
import { fetchClient } from './fetchClient';

export const CategoryService = {
  async getCategories(): Promise<Category[]> {
    const products = await fetchClient<ProductItem[]>('/products');

    const uniqueMap = new Map<number, Category>();

    products.forEach((product) => {
      if (product.category && product.category.id) {
        uniqueMap.set(product.category.id, product.category);
      }
    });

    return Array.from(uniqueMap.values());
  }
};
