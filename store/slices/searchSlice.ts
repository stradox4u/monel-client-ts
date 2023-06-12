import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";
import { Product } from "../../src/types";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    products: [],
    filteredProducts: [],
  },
  reducers: {
    setSearchTerm: (state, action: { type: string; payload: string; }) => {
      state.searchTerm = action.payload;
      console.log(state.products)
      state.filteredProducts = state.products.filter((product: Product) => {
        if(!state.searchTerm) return true;
        return product.name.toLowerCase().includes(state.searchTerm.toLowerCase());
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.fetchProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload.products;
        state.filteredProducts = payload.products.filter((product: Product) => {
          if (!state.searchTerm) return true;
          return product.name.toLowerCase().includes(state.searchTerm.toLowerCase());
        });
      }
    )
  },
});

export const searchReducer = searchSlice.reducer;
export const { setSearchTerm } = searchSlice.actions;