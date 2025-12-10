import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parseCookies } from "nookies";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  prepareHeaders: (headers) => {
    const cookies = parseCookies();
    const token = cookies.access_token;

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
