import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const inventoryApi = createApi({
  reducerPath: "inventory",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["Inventory"],
  endpoints: (builder) => {
    return {
      fetchInventory: builder.query({
        providesTags: ["Inventory"],
        query: () => {
          return {
            url: "/inventory",
            method: "GET",
          }
        }
      })
    }
  }
});

export const { useFetchInventoryQuery } = inventoryApi;
export { inventoryApi };