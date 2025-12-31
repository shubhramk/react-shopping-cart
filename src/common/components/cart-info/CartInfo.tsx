import React, { useContext, useActionState, useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { CartItem } from "../../../models/cart-item.model";
import ProductQuantity from "../../../containers/product/product-card/ProductQuantity";
import { UserContext } from "../../context/context";

import {
  addInCart,
  removeFromCart,
  clearCart,
} from "../../../store/cart.slice";
import CartEmptyOrCheckout from "./CartEmptyOrCheckout";

type ConfirmAction =
  | { type: "item"; item: CartItem }
  | { type: "clear" }
  | null;

const CartInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Redux cart state
  const cartItems: CartItem[] = useSelector((state: any) => state.cart.list);

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }

  const { user, setUser } = userContext;

  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [showLogin, setShowLogin] = useState(false);

  const [state, formAction, pending] = useActionState(loginAction, null);

  // ✅ Quantity change (absolute)
  const handleQuantityChange = (item: CartItem, quantity: number) => {
    dispatch(
      addInCart({
        product: item.product,
        quantity,
      })
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const checkout = () => {
    if (!user) {
      setShowLogin(true);
    } else {
      navigate("/payment");
    }
  };

  async function loginAction(_: any, formData: FormData) {
    const email = formData.get("email") as string;
    setUser({ name: email });
    navigate("/payment");
  }

  return (
    <section className="py-30 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>

          {cartItems.length > 0 && (
            <button
              onClick={() => setConfirmAction({ type: "clear" })}
              className="flex items-center gap-3 px-4 py-2 rounded-full
                         bg-red-50 border border-red-200
                         text-red-600 font-semibold text-sm
                         hover:bg-red-100 cursor-pointer transition"
            >
              <Trash2 size={14} />
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 && (
              <div className="bg-white p-6 rounded-xl border text-center">
                Your cart is empty
              </div>
            )}

            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border rounded-xl p-4
                           flex flex-col md:flex-row gap-4"
              >
                {/* IMAGE */}
                <img
                  src={item.product.images?.[0]}
                  alt={item.product.title}
                  className="w-32 h-32 object-contain cursor-pointer"
                  onClick={() => navigate(`/products/${item.product.id}`)}
                />

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {item.product.title}
                    </h3>

                    <button
                      onClick={() =>
                        setConfirmAction({
                          type: "item",
                          item,
                        })
                      }
                      className="text-red-500 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <ProductQuantity
                      value={item.quantity}
                      onChange={(qty) => handleQuantityChange(item, qty)}
                    />

                    <span className="font-bold text-lg">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — SUMMARY */}
          <div className="bg-white border rounded-xl p-6 h-fit shadow-md">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-3">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between mb-6">
              <span>Total</span>
              <span className="font-bold text-lg">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <CartEmptyOrCheckout cartItems={cartItems} checkout={checkout} />
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setConfirmAction(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="p-4 bg-red-100 rounded-full mb-4">
                <Trash2 className="text-red-600" size={26} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {confirmAction.type === "clear"
                  ? "Clear cart?"
                  : "Remove item?"}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6">
                {confirmAction.type === "clear"
                  ? "Are you sure you want to remove all items from your cart?"
                  : `Remove "${confirmAction.item.product.title}" from your cart?`}
              </p>

              {/* Actions */}
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 py-2 rounded-lg border text-gray-700 font-semibold hover:bg-gray-100 cursor-pointer transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (confirmAction.type === "clear") {
                      dispatch(clearCart());
                    } else {
                      dispatch(removeFromCart(confirmAction.item.product.id));
                    }
                    setConfirmAction(null);
                  }}
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 cursor-pointer transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL (unchanged UI) */}
      {showLogin && !user && (
        <form action={formAction}>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowLogin(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-5">
                <h2 className="text-xl font-bold text-white">
                  Secure Checkout
                </h2>
                <p className="text-sm text-blue-100">
                  Login to complete your purchase
                </p>
              </div>

              {/* BODY */}
              <div className="p-6 space-y-6">
                {/* Order Preview */}
                <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4 border">
                  <span className="text-sm font-medium text-gray-600">
                    Cart Total
                  </span>
                  <span className="text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 rounded-full shadow">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                {/* Login Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="mt-1 w-full rounded-lg border px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      className="mt-1 w-full rounded-lg border px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowLogin(false)}
                    className="flex-1 py-2 rounded-lg border text-gray-700 font-semibold
                       hover:bg-gray-100 cursor-pointer transition"
                  >
                    Cancel
                  </button>

                  <button
                    className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600
                       text-white font-semibold hover:from-blue-600 hover:to-purple-700 cursor-pointer transition"
                  >
                    Login & Continue
                  </button>
                </div>

                {/* FOOTER */}
                <p className="text-xs text-center text-gray-500">
                  New here?{" "}
                  <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                    Create an account
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};

export default CartInfo;
