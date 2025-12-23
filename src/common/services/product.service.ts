import type { ProductItem } from '../components/product/types/product.types';
import { fetchClient } from './fetchClient';

export const ProductService = {
  async getAll(): Promise<ProductItem[]> {
    return fetchClient<ProductItem[]>('/products');
  },

  async getByIdFromLocal(id: string | number): Promise<ProductItem | undefined> {
    const products = await this.getAll();
    // Convert id to number to ensure the match works
    return products.find(p => p.id === Number(id));
  }

  /* Future methods for product service 
    TODO: Get by Category
    TODO: Search Products
  */
};
