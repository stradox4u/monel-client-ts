import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transactions } from "../../src/types";

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
      }),
      getPurchases: builder.query<Transactions<"purchases">, void>({
        query: () => {
          return {
            url: "/purchases",
            method: "GET",
          }
        }
      }),
      getSales: builder.query<Transactions<"sales">, void>({
        query: () => {
          return {
            url: "/sales",
            method: "GET",
          }
        }
      })
    }
  }
});

export const { useMakeSaleMutation, useMakePurchaseMutation, useGetPurchasesQuery, useGetSalesQuery } = saleApi;
export { saleApi };