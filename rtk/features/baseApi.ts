import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["user", "users", "idea", "admin"],
  endpoints: () => ({}),
});

export default baseApi;
