import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const saleApi = createApi({
  reducerPath: "sale",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  }),
  tagTypes: ["Sale", "Inventory"],
  endpoints: (builder) => {
    return {
      makeSale: builder.mutation({
        invalidatesTags: ["Inventory"],
        query: (body) => {
          return {
            url: "/sale",
            method: "POST",
            body,
          }
        }
      }),
      makePurchase: builder.mutation({
        invalidatesTags: ["Inventory"],
        query: (body) => {
          return {
            url: "/purchase",
            method: "POST",
            body,
          }
        }
      })
    }
  }
});

export const { useMakeSaleMutation, useMakePurchaseMutation } = saleApi;
export { saleApi };