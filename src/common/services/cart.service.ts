import type { CartItem } from "../../models/cart-item.model";
import type { ProductItem } from "../../models/product-item.model";
import localStore from "./localstorage.service";

const CART_KEY = "cart_items";

export class CartService {
  static getCart(): CartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveCart(cart: CartItem[]): void {
    localStore.set(CART_KEY, JSON.stringify(cart));
  }

  static getItemQuantity(productId: number): number {
    const cart = this.getCart();
    const item = cart.find((i) => i.product.id === productId);
    return item?.quantity ?? 1;
  }

  static addToCart(product: ProductItem, quantity: number): CartItem[] {
    const cart = this.getCart();

    const index = cart.findIndex((item) => item.product.id === product.id);

    if (index > -1) {
      // ✅ Replace quantity with latest selected value
      cart[index] = {
        ...cart[index],
        quantity,
      };
    } else {
      cart.push({ product, quantity });
    }

    this.saveCart(cart);
    return cart;
  }

  static removeFromCart(productId: number): CartItem[] {
    const updatedCart = this.getCart().filter(
      (item) => item.product.id !== productId
    );
    this.saveCart(updatedCart);
    return updatedCart;
  }

  static clearCart(): void {
    localStore.remove(CART_KEY);
  }
}
