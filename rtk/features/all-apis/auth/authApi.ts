import baseApi from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["user"],
    }),

    
  }),
});

export const { useLoginMutation } = authApi;
