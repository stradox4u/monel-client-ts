import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { CurrentUser } from "../../src/types";



const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["AuthUser"],
  endpoints: (builder) => {
    return {
      fetchUser: builder.query<CurrentUser, void>({
        providesTags: ["AuthUser"],
        query: () => {
          return {
            url: "/auth/user",
            method: "GET"
          }
        }
      }),
      logoutUser: builder.mutation<{ message: string; }, void>({
        invalidatesTags: ["AuthUser"],
        query: () => {
          return {
            url: "/auth/logout",
            method: "POST",
            body: {},
            params: {},
          }
        }
      }),
    }
  }
});

export const { useFetchUserQuery, useLogoutUserMutation } = userApi;
export { userApi };