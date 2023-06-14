import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";
import { Product } from "../../src/types";

type SearchSliceInitialState = {
  searchTerm: string;
  products: Product[];
  filteredProducts: Product[];
}

const searchSlice = createSlice<SearchSliceInitialState, SliceCaseReducers<SearchSliceInitialState>, "search">({
  name: "search",
  initialState: {
    searchTerm: "",
    products: [],
    filteredProducts: [],
  },
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
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