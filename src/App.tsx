import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/layout/Layout";
import Home from "./containers/home/Home";
import ProductDetail from "./containers/product/product-detail/ProductDetail";
import ErrorPage from "./containers/error/ErrorPage";
import ProductList from "./containers/product/product-list/ProductList";
import ProtectedRoute from "./hoc/protected-route/ProtectedRoute";
import UnAuthorized from "./containers/error/UnAuthorized";
import React, { Suspense, useState } from "react";
import ProductLoader from "./containers/product/product-detail/ProductLoader";
import { UserContext } from "./common/context/context";
import ErrorBoundary from "./hoc/error-boundary/ErrorBoundary";

function App() {
  const [user, setUser] = useState({ name: "John Doe" });

  //const Payment = React.lazy(() => import("./containers/order/payment/Payment"));
  // Simulate a delay for loading the Payment component to show Suspense in action
  const Payment = React.lazy(
    () =>
      new Promise((resolve) => {
        setTimeout(
          () => resolve(import("./containers/order/payment/Payment")),
          2000
        );
      })
  );

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserContext.Provider value={user}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="products"
              element={
                <ErrorBoundary>
                  <ProductList />
                </ErrorBoundary>
              }
            />

            <Route
              path="products/:id"
              element={
                <Suspense fallback={<ProductLoader />}>
                  <ProductDetail />
                </Suspense>
              }
            />

            <Route
              path="payment"
              element={
                <ProtectedRoute redirectPath="/unauthorized">
                  <Suspense fallback={<p>Loading...</p>}>
                    <Payment />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route path="unauthorized" element={<UnAuthorized />} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </Suspense>
  );
}

export default App;
