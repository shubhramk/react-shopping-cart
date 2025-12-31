// store/cart.slice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../models/cart-item.model";
import { CartService } from "../common/services/cart.service";
import type { ProductItem } from "../models/product-item.model";

interface CartState {
  list: CartItem[];
}

const initialState: CartState = {
  list: CartService.getCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addInCart: (
      state,
      action: PayloadAction<{ product: ProductItem; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;

      const index = state.list.findIndex(
        (item) => item.product.id === product.id
      );

      // Remove if quantity <= 0
      if (quantity <= 0) {
        state.list = state.list.filter(
          (item) => item.product.id !== product.id
        );
        CartService.saveCart(state.list);
        return;
      }

      // Update existing
      if (index > -1) {
        state.list[index].quantity = quantity;
      } else {
        // Add new
        state.list.push({ product, quantity });
      }

      CartService.saveCart(state.list);
    },
    setQuantity(
      state,
      action: PayloadAction<{ product: any; quantity: number }>
    ) {
      const { product, quantity } = action.payload;
      const index = state.list.findIndex((i) => i.product.id === product.id);

      if (quantity <= 0) {
        state.list = state.list.filter((i) => i.product.id !== product.id);
      } else if (index > -1) {
        state.list[index].quantity = quantity;
      } else {
        state.list.push({ product, quantity });
      }

      CartService.saveCart(state.list);
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.list = state.list.filter(
        (item) => item.product.id !== action.payload
      );
      CartService.saveCart(state.list);
    },

    clearCart(state) {
      state.list = [];
      CartService.clearCart();
    },
  },
});

export const { addInCart, setQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
