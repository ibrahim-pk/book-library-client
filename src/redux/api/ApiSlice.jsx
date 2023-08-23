import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["delete"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-server-ibrahimecste.vercel.app",
  }),
  endpoints: () => ({}),
});
