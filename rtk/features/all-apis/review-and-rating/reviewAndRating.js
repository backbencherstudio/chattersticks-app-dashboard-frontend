import baseApi from "../../baseApi";

const reviewAndRatingsApi = baseApi.injectEndpoints({
  
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (params) => ({
        url: "/dashboard/reviews",
        method: "GET",
        params: params,
      }),
      providesTags: ["reviews"],
    }),
  }),
});

export const { useGetAllReviewsQuery } = reviewAndRatingsApi;
