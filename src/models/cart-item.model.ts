import type { ProductItem } from "./product-item.model";

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface AddToCartButtonProps {
  product: ProductItem;
  quantity: number;
  onAdded?: (cartCount: number) => void;
}