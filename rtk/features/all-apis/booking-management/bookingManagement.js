const { default: baseApi } = require('../../baseApi');

const bookingManagementAPi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllBookings: builder.query({
      query: () => 'dashboard/booking-management',
      providesTags: ['booking'],
    }),
  }),
});
export const { useGetAllBookingsQuery, useDeleteBookingMutation } =
  bookingManagementAPi;
