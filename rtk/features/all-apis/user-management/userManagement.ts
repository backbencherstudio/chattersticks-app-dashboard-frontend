import baseApi from "../../baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query({
      query: params => ({
        url: '/admin/user/all-users',
        method: 'GET',
        params: params,
      }),
      providesTags: ['users'],
    }),

    getUserById: builder.query({
      query: (id) => `/admin/user/user-details/${id}`,
      providesTags: ['users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  
} = userManagementApi;
