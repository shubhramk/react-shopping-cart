import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products.slice';
import cartReducer from './cart.slice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch