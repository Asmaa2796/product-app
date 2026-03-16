import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ limit = 8, skip = 0 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/products?limit=${limit}&skip=${skip}`
      );
      return data;
    } catch (error) {
      return rejectWithValue("Failed to load products");
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async ({ query, limit = 8, skip = 0 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`
      );
      return data;
    } catch (error) {
      return rejectWithValue("Search failed");
    }
  }
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products/category-list`);
      return data; // array of strings
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load categories");
    }
  }
);

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async ({ category, limit = 8, skip = 0 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
      );
      return data;
    } catch (error) {
      return rejectWithValue("Failed to load category products");
    }
  }
);
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`,
        { headers: { "Content-Type": "application/json" }, });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load product data");
    }
  });
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories: [],
    selectedProduct: {},
    total: 0,
    limit: 8,
    skip: 0,
    currentPage: 1,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.skip = action.payload.skip;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // search products
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        const filtered = action.payload.products.filter((product) =>
          product.title.toLowerCase().includes(action.meta.arg.query.toLowerCase())
        );

        state.products = filtered;
        state.total = filtered.length;
      })
      // fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.skip = action.payload.skip;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // get product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;