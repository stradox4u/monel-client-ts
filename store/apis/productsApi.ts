import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  tagTypes: ["Products", "Inventory"],
  endpoints: (builder) => {
    return {
      fetchProducts: builder.query({
        providesTags: ["Products"],
        query: () => {
          return {
            url: "/products",
            method: "GET",
          }
        }
      }),
      createProduct: builder.mutation({
        invalidatesTags: ["Products"],
        query: ({ name, price, picture }) => {
          return {
            url: "/product",
            method: "POST",
            body: { name, price, picture },
            params: {},
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        }
      }),
      updateProduct: builder.mutation({
        invalidatesTags: ["Products"],
        query: ({ name, price, picture, productId }) => {
          return {
            url: `/product/${productId}`,
            method: "PATCH",
            body: { name, price, picture },
            params: {},
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        }
      }),
      deleteProduct: builder.mutation({
        invalidatesTags: ["Products", "Inventory"],
        query: ({ productId }) => {
          return {
            url: `/product/${productId}`,
            method: "DELETE",
          }
        }
      })
    }
  }
});

export const {
  useFetchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productsApi;
export { productsApi };