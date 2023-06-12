import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";
import { authReducer } from "./slices/authSlice";
import { CurrentUser } from "../src/types";
import { statsApi } from "./apis/statsApi";
import { productsApi } from "./apis/productsApi";
import { inventoryApi } from "./apis/inventoryApi";
import { searchReducer, setSearchTerm } from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      userApi.middleware,
      statsApi.middleware,
      productsApi.middleware,
      inventoryApi.middleware,
    );
  }
});

setupListeners(store.dispatch);

export const clearUser = () => {
  store.dispatch(userApi.util.resetApiState());
}

export { store, setSearchTerm };
export { useFetchUserQuery, useLogoutUserMutation } from "./apis/userApi";
export { useFetchStatsQuery } from "./apis/statsApi";
export type StoreRootState = ReturnType<typeof store.getState>;
export const getCurrentUser = (state: StoreRootState) => state.auth.user as CurrentUser;
export {
  useFetchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} from "./apis/productsApi";
export { useFetchInventoryQuery } from "./apis/inventoryApi";