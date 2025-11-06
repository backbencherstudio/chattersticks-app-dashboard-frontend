import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  prepareHeaders: (headers) => {
    // const cookies = parseCookies();
    // const token = cookies.token;

    // if (token) {
    //   headers.set("Authorization", token);
    // }

    // return headers;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZpcmRpdTIwMEBnbWFpbC5jb20iLCJzdWIiOiJjbWhscm43bWowMDAwdjhiNHlpc3ptbGZkIiwiaWF0IjoxNzYyMzM2MzE3LCJleHAiOjE3NjIzMzk5MTd9.KjHLwG5SWkvuRFfp_HqztHtZ2Y5E-gNvbz9TOLiZShc";

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["user"],
  endpoints: () => ({}),
});

export default baseApi;
