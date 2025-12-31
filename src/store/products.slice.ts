import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductItem } from "../models/product-item.model";
import { http } from "../common/services/http.service";
import { API_BASE_PATH } from "../common/constants/constants";
import type { Category } from "../models/category.model";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const path = `${API_BASE_PATH}/products`;
  const products = await http.get(path);
  return products.data;
});

export interface Products {
  loading: boolean;
  error: string | null;
  list: ProductItem[];
}
const initialState: Products = {
  loading: true,
  error: null,  
  list: []
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {  
    showCategory: (state) => {
      const uniqueMap = new Map<number, Category>();
      state?.list.forEach((product: { category: Category }) => {
        if (product.category && product.category.id) {
          uniqueMap.set(product.category.id, product.category);
        }
      });

      const categories = Array.from(uniqueMap.values());
      console.log("Unique Categories:", categories);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

// Action creators are generated for each case reducer function
export const { showCategory } = productsSlice.actions;

export default productsSlice.reducer;
