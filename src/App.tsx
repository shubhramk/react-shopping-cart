
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Layout from './hoc/layout/Layout'
import Product from './common/components/product/Product';
import ProductDetails from './common/components/product/ProductDetails';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Product />} />
        <Route path="products/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default App
