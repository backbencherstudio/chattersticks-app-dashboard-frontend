import baseApi from "../../baseApi";

const shopManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllReviews: builder.query({
      query: params => ({
        url: '/admin/shop-management',
        method: 'GET',
        params: params,
      }),
      providesTags: ['reviews'],
    }),

    addProviders: builder.mutation({
      query: body => ({
        url: '/admin/shop-management/providers',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['reviews'],
    }),
  }),
});

export const { useGetAllReviewsQuery, useAddProvidersMutation } =
  shopManagementApi;
