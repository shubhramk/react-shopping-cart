import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import ProductQuantity from "../product-card/ProductQuantity";
import { useSelector, useDispatch } from "react-redux";
import type { ProductItem } from "../../../models/product-item.model";
import ProductLoader from "./ProductLoader";
import { useDocumentTitle } from "../../../common/hooks/DocumentTitle";
import type { AppDispatch, RootState } from "../../../store";
import { addInCart } from "../../../store/cart.slice";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector((state: RootState) =>
    state.products.list.find((p: ProductItem) => Number(p.id) === Number(id))
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  const cartItems = useSelector((state: RootState) => state.cart.list);
  const cartItem = product
    ? cartItems.find((item) => item.product.id === product.id)
    : undefined;

  const [quantity, setQuantity] = useState<number>(
    cartItem ? cartItem.quantity : 1
  );
  const [activeImage, setActiveImage] = useState<string>(
    product?.images?.[0] || ""
  );
  const [inCart, setInCart] = useState<boolean>(!!cartItem);

  // Sync with cart when product or cart changes
  useEffect(() => {
    if (!product) return;
    const currentItem = cartItems.find(
      (item) => item.product.id === product.id
    );
    setInCart(!!currentItem);
    setQuantity(currentItem ? currentItem.quantity : 1);
    setActiveImage(product.images?.[0] || "");
  }, [product, cartItems]);

  const totalPrice = product ? product.price * quantity : 0;
  useDocumentTitle(product?.title || "Product Detail");

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addInCart({ product, quantity }));
    setInCart(true);
  };

  if (loading) return <ProductLoader />;

  if ((error || !product) && !loading)
    return (
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Product not available
        </h2>
        <p className="text-gray-600">{error}</p>
      </section>
    );

  return (
    <section className="py-30 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-900 cursor-pointer transition"
          >
            <CircleArrowLeft /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT – Images */}
          <div
            className={`bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition ${
              inCart ? "ring-2 ring-blue-200" : ""
            }`}
          >
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg mb-4">
              <img
                src={activeImage}
                alt={product?.title}
                className="max-h-full object-contain"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {product?.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-lg p-1 min-w-[70px] h-[70px] flex items-center justify-center transition ${
                    activeImage === img
                      ? "border-blue-900 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title}-${index}`}
                    className="h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT – Details */}
          <div
            className={`bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition ${
              inCart ? "ring-2 ring-blue-200" : ""
            }`}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {product?.title}
            </h1>
            <p className="text-xl font-semibold text-blue-900 mb-4">
              ${totalPrice.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product?.description}
            </p>

            <div className="mb-6">
              <span className="inline-block text-xs font-medium bg-gray-300 text-gray-700 border border-gray-700 px-3 py-2 rounded-full">
                {product?.category?.name}
              </span>
            </div>

            {/* Quantity */}
            <div className="mt-6 pb-6 border-b">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Quantity
                </span>
                <ProductQuantity value={quantity} onChange={setQuantity} />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 border-2 border-blue-900 text-blue-900 py-3 rounded-lg font-semibold
                           hover:bg-blue-900 hover:text-white cursor-pointer transition"
              >
                {inCart ? "Update Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
