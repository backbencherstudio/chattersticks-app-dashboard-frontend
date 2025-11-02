const { default: baseApi } = require('../../baseApi');

const dashboardApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllDashboard: builder.query({
      query: () => '/dashboard',
      providesTags: ['dashboard'],
    }),
  }),
});
export const {useGetAllDashboardQuery}= dashboardApi
