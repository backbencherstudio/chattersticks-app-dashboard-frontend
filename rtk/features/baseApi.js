import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parseCookies } from "nookies";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  prepareHeaders: (headers) => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      headers.set("Authorization", token);
    }

    return headers;
  },
});
const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    'user',
    'booking',
    'payment',
    'reviews',
    'notification',
    'setting',
    'dashboard',
    'report',
  ],
  endpoints: () => ({}),
});

export default baseApi;
