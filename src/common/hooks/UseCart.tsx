import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { setQuantity, removeFromCart, clearCart } from "../../store/cart.slice";

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.list);

  const totalAmount = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const getItemQuantity = (productId: number) =>
    cart.find((i) => i.product.id === productId)?.quantity ?? 0;

  return {
    cart,
    totalAmount,
    getItemQuantity,
    setQuantity: (product: any, qty: number) =>
      dispatch(setQuantity({ product, quantity: qty })),
    remove: (id: number) => dispatch(removeFromCart(id)),
    clear: () => dispatch(clearCart()),
  };
}
