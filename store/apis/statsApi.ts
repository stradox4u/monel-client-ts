import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const statsApi = createApi({
  reducerPath: "stats",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      fetchStats: builder.query({
        query: () => {
          return {
            url: "/stats",
            method: "GET",
          }
        }
      })
    }
  }
});

export const { useFetchStatsQuery } = statsApi;
export { statsApi };