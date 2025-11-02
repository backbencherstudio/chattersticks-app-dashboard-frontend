import baseApi from '../../baseApi';

const notificationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getAllNotifications: builder.query({
      query: params => ({
        url: '/admin/notification/today',
        method: 'GET',
        params: params,
      }),
      providesTags: ['notification'],
    }),

    sendNotification: builder.mutation({
      query: data => ({
        url: '/admin/notification/send',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['notification'],
    }),
  }),
});

export const { useGetAllNotificationsQuery, useSendNotificationMutation } =
  notificationApi;
