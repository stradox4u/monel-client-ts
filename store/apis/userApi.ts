import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { CurrentUser } from "../../src/types";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      fetchUser: builder.query<CurrentUser, void>({
        providesTags: [{ type: "User" }],
        query: () => {
          return {
            url: "/auth/user",
            method: "GET"
          }
        }
      }),
      logoutUser: builder.mutation({
        invalidatesTags: [{ type: "User" }],
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