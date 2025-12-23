import type { ProductItem } from '../components/product/types/product.types';
import { fetchClient } from './fetchClient';

export const ProductService = {
  getAll(): Promise<ProductItem[]> {
    return fetchClient<ProductItem[]>('/products');
  }

  /* Future methods for product service 
    TODO: Get by Product ID
    TODO: Get by Category
    TODO: Search Products
  */
};
