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
  name: string;
  price: number;
  picture: string;
  productId: string;
}

type CreateProductBody = Omit<UpdateProductBody, "productId">;

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
      fetchProducts: builder.query<ProductsResponse, void>({
        providesTags: ["Products"],
        query: () => {
          return {
            url: "/products",
            method: "GET",
          }
        }
      }),
      createProduct: builder.mutation<ProductPostResponse, CreateProductBody>({
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
      updateProduct: builder.mutation<ProductPostResponse, UpdateProductBody>({
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