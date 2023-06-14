import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../src/types";

type ProductsResponse = {
  message: string;
  products: Product[];
}

type ProductPostResponse = {
  message: string;
  product: Product;
}

type UpdateProductBody = {
  form: FormData;
  productId: string;
}


const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    headers: {
      "Accept": "application/json",
    },
    credentials: "include",
  }),
  tagTypes: ["Products", "Inventory"],
  endpoints: (builder) => {
    return {
      fetchProducts: builder.query<ProductsResponse, void>({
        providesTags: ["Products"],
        query: () => {
          return {
            url: "/products",
            method: "GET",
          }
        }
      }),
      createProduct: builder.mutation<ProductPostResponse, FormData>({
        invalidatesTags: ["Products"],
        query: (body) => {
          return {
            url: "/product",
            method: "POST",
            body,
            params: {},
          }
        }
      }),
      updateProduct: builder.mutation<ProductPostResponse, UpdateProductBody>({
        invalidatesTags: ["Products"],
        query: ({ form, productId }) => {
          return {
            url: `/product/${productId}`,
            method: "PATCH",
            body: form,
            params: {},
          }
        }
      }),
      deleteProduct: builder.mutation<{message: string}, {productId: string}>({
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