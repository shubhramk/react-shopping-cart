
import type { Category } from '../../models/category.model';
import { API_BASE_PATH } from '../constants/constants';
import { http } from './http.service';

export const CategoryService = {
 /* async getCategories(): Promise<Category[]> {
    const products = await fetchClient<ProductItem[]>('/products');

    const uniqueMap = new Map<number, Category>();

    products.forEach((product) => {
      if (product.category && product.category.id) {
        uniqueMap.set(product.category.id, product.category);
      }
    });

    return Array.from(uniqueMap.values());
  }*/
  async getCategories(): Promise<Category[]> {
    const path = `${API_BASE_PATH}/products`;
    const products = await http.get(path);

    const uniqueMap = new Map<number, Category>();

    products?.data.forEach((product: { category: Category; }) => {
      if (product.category && product.category.id) {
        uniqueMap.set(product.category.id, product.category);
      }
    });

    return Array.from(uniqueMap.values());
  }

};
