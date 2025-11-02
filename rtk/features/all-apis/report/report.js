const { default: baseApi } = require("../../baseApi");

const reportApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getAllReportsBookings: builder.query({
      query: params => ({
        url: 'admin/reports/bookings',
        method: 'GET',
        params: params,
      }),
      providesTags: ['report'],
    }),
    getAllEarningSummary: builder.query({
      query: () => 'admin/reports/earnings/summary',
      providesTags: ['report'],
    }),
    getAllEarningDetails: builder.query({
      query: () => 'admin/reports/earnings/detailed',
      providesTags: ['report'],
    }),
  }),
});



export const {useGetAllReportsBookingsQuery, useGetAllEarningSummaryQuery, useGetAllEarningDetailsQuery }=reportApi