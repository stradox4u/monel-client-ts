import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StatData } from "../../src/types";

const statsApi = createApi({
  reducerPath: "stats",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      fetchStats: builder.query<StatData, void>({
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