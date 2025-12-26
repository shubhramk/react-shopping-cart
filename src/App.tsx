
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './hoc/layout/Layout';
import Home from './containers/home/Home';
import ProductDetail from './containers/product/product-detail/ProductDetail';
import ErrorPage from './containers/error/ErrorPage';
import ProductList from './containers/product/product-list/ProductList';
import ProtectedRoute from './hoc/protected-route/ProtectedRoute';
import Payment from './containers/order/payment/Payment';
import UnAuthorized from './containers/error/UnAuthorized';

const user =  null;//{ name: "John Doe" };
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="payment" element={
          <ProtectedRoute user={user} redirectPath='/unauthorized'>
            <Payment />
          </ProtectedRoute>
        } />
        <Route path="unauthorized" element={<UnAuthorized />} />
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App
