import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";
import { authReducer } from "./apis/authSlice";
import { CurrentUser } from "../src/types";
import { statsApi } from "./apis/statsApi";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware, statsApi.middleware);
  }
});

setupListeners(store.dispatch);

export const clearUser = () => {
  store.dispatch(userApi.util.resetApiState());
}

export { store };
export { useFetchUserQuery, useLogoutUserMutation } from "./apis/userApi";
export { useFetchStatsQuery } from "./apis/statsApi";
type RootState = ReturnType<typeof store.getState>;
export const getCurrentUser = (state: RootState) => state.auth.user as CurrentUser;