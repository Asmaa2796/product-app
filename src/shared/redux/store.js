import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./Slices/ProductsSlice";
const store = configureStore({
  reducer: {
    products: ProductsSlice
  },
});

export default store;
