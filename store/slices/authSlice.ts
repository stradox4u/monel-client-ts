import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../apis/userApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.logoutUser.matchFulfilled,
      (state, _) => {
        state.user = {}
      }
    ),
    builder.addMatcher(
      userApi.endpoints.fetchUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    ),
    builder.addMatcher(
      userApi.endpoints.fetchUser.matchRejected,
      (state, _) => {
        state.user = {};
      }
    )
  },
});

export const authReducer = authSlice.reducer;