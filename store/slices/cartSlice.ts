import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../src/types";

type SliceState = {
  items: CartItem[];
}

const initialState: SliceState = {
  items: [],
}

const cartSlice = createSlice<SliceState, SliceCaseReducers<SliceState>, "cart">({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
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
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((el) => el.product._id === action.payload);
      state.items.splice(index, 1);
    },
    updateCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex((el) => el.product._id === action.payload.product._id);
      const { product, price, quantity } = action.payload;
      state.items.splice(index, 1, { product, price, quantity });
    },
    emptyCart: (state, _action: PayloadAction<void>) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateCart, emptyCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;