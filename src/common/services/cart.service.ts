import type { CartItem } from "../../models/cart-item.model";
import type { ProductItem } from "../../models/product-item.model";
import localStore from "./localstorage.service";

const CART_KEY = "cart_items";

export class CartService {
  static getCart(): CartItem[] {
    const data = localStore.get(CART_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveCart(cart: CartItem[]): void {
    localStore.set(CART_KEY, JSON.stringify(cart));
  }

  // ✅ RETURN 0 if NOT in cart
  static getItemQuantity(productId: number): number {
    const cart = this.getCart();
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  }

  // ✅ ABSOLUTE SET (NO INCREMENT EVER)
  static setQuantity(product: ProductItem, quantity: number): CartItem[] {
    const cart = this.getCart();
    const index = cart.findIndex((i) => i.product.id === product.id);

    if (quantity <= 0) {
      return this.removeFromCart(product.id);
    }

    if (index > -1) {
      cart[index] = { ...cart[index], quantity };
    } else {
      cart.push({ product, quantity });
    }

    this.saveCart(cart);
    return cart;
  }

  // ✅ Alias for clarity
  static addToCart(product: ProductItem, quantity: number): CartItem[] {
    return this.setQuantity(product, quantity);
  }

  static removeFromCart(productId: number): CartItem[] {
    const updated = this.getCart().filter(
      (item) => item.product.id !== productId
    );
    this.saveCart(updated);
    return updated;
  }

  static clearCart(): void {
    localStore.remove(CART_KEY);
  }

  // ✅ Needed for Header total
  static getTotalAmount(): number {
    return this.getCart().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
