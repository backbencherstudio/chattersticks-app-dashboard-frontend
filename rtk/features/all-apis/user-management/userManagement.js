import baseApi from "../../baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/dashboard/user-management",
        method: "GET",
        params: params,
      }),
      providesTags: ["user"],
    }),

    getUserById: builder.query({
      query: ({ id }) => `/dashboard/user-management/${id}`,
      providesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/dashboard/user-management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    restoreUser: builder.mutation({
      query: ({ id }) => ({
        url: `/dashboard/user-management/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),

    suspendUser: builder.mutation({
      query: ({ id }) => ({
        url: `/dashboard/user-management/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useSuspendUserMutation,
} = userManagementApi;
