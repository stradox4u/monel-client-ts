import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../src/types";

type SliceState = {
  items: CartItem[];
}

const initialState: SliceState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { type: string; payload: CartItem }) => {
      const existingItem = state.items.find((el) => el.product._id === action.payload.product._id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          product: action.payload.product,
          price: +action.payload.price,
          quantity: 1,
        })
      }
    },
    removeFromCart: (state, action: { type: string; payload: string }) => {
      const index = state.items.findIndex((el) => el.product._id === action.payload);
      state.items.splice(index, 1);
    },
    updateCart: (state, action: { type: string; payload: CartItem }) => {
      const index = state.items.findIndex((el) => el.product._id === action.payload.product._id);
      const { product, price, quantity } = action.payload;
      state.items.splice(index, 1, { product, price, quantity });
    },
    emptyCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateCart, emptyCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;