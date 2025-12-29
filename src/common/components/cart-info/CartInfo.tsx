import React, { useState, useEffect, useContext, useActionState } from "react";
import { Trash2 } from "lucide-react";
import type { CartItem } from "../../../models/cart-item.model";
import { CartService } from "../../services/cart.service";
import ProductQuantity from "../../../containers/product/product-card/ProductQuantity";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";

type ConfirmAction =
  | { type: "item"; item: CartItem }
  | { type: "clear" }
  | null;

const CartInfo: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [showLogin, setShowLogin] = useState(false);
  const {user,setUser} = useContext(UserContext);
  const [state, formAction, pending] = useActionState(loginAction, null);

  useEffect(() => {
    setCartItems(CartService.getCart());
  }, []);

  const handleQuantityChange = (item: CartItem, nextQty: number) => {
    CartService.setQuantity(item.product, nextQty);
    setCartItems(CartService.getCart());
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
  }

 async function loginAction(prevState:any, formData:any)  {
    console.log([...formData.entries(),formData.get("email"),formData.get("password")]);
    const email = formData.get("email");
    const password = formData.get("password");
    setUser({ name: email });
    navigate("/payment");
    /*
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return "Login failed";
    return "Logged in successfully!";*/
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>

          {cartItems.length > 0 && (
            <button
              onClick={() => setConfirmAction({ type: "clear" })}
              className="flex items-center gap-3 px-4 py-2 rounded-full
                         bg-red-50 border border-red-200
                         text-red-600 font-semibold text-sm
                         hover:bg-red-100 hover:border-red-300 transition cursor-pointer"
            >
              <span className="p-1.5 bg-red-100 rounded-full">
                <Trash2 size={14} />
              </span>
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT – Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 && (
              <div className="bg-white p-6 rounded-xl border text-center text-gray-600 shadow-sm">
                Your cart is empty
              </div>
            )}

            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border rounded-xl p-4 flex flex-col md:flex-row gap-4
                           shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              >
                {/* Image */}
                <div
                  className="bg-gray-100 rounded-full w-32 h-32 flex items-center justify-center cursor-pointer border hover:border-blue-300 transition"
                  onClick={() => navigate(`/products/${item.product.id}`)}
                >
                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.title}
                    className="h-28 w-28 object-contain rounded-full"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {item.product.title}
                    </h3>
                    <button
                      onClick={() => setConfirmAction({ type: "item", item })}
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Unit Price & Total */}
                  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mb-2">
                    {/* Unit Price */}
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <span>Unit:</span>
                      <span className="font-medium text-gray-800">
                        ${item.product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-400">/ item</span>
                    </div>

                    {/* Total Price */}
                    <div className="text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 rounded-full shadow-md transition-transform transform hover:scale-105">
                      Total: ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center justify-between mt-2">
                    <ProductQuantity
                      value={item.quantity}
                      onChange={(val) => handleQuantityChange(item, val)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT – Summary */}
          <div className="bg-white border rounded-xl p-6 h-fit shadow-md flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between items-center text-sm mb-4">
              <span>Total</span>
              <span className="text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 rounded-full shadow-md">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => checkout()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg
             font-semibold hover:from-blue-600 hover:to-purple-700 transition cursor-pointer"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setConfirmAction(null)}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-red-100 rounded-full mb-4 cursor-pointer">
                <Trash2 className="text-red-600" size={26} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {confirmAction.type === "clear"
                  ? "Clear cart?"
                  : "Remove item?"}
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                {confirmAction.type === "clear"
                  ? "Are you sure you want to remove all items from your cart?"
                  : `Remove "${confirmAction.item.product.title}" from your cart?`}
              </p>

              <div className="flex w-full gap-3">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 py-2 rounded-lg border text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (confirmAction.type === "clear") {
                      CartService.clearCart();
                    } else {
                      CartService.removeFromCart(confirmAction.item.product.id);
                    }

                    setCartItems(CartService.getCart());
                    setConfirmAction(null);
                  }}
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <h2 className="text-xl font-bold text-white">Secure Checkout</h2>
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
                       hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600
                       text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition"
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
        )
        
        }
    </section>
  );
};

export default CartInfo;
