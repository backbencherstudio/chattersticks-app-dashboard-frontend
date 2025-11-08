import baseApi from '../../baseApi';

const ideaManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // ✅ Get all ideas (approved + pending)
    getAllIdeas: builder.query({
      query: params => ({
        url: '/admin/idea/all',
        method: 'GET',
        params: params,
      }),
      providesTags: ['idea'],
    }),

    //  Approve an idea (PATCH)
    approveIdea: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/idea/update-idea/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['idea'],
    }),

    //  Get all approved ideas
    getApprovedIdeas: builder.query({
      query: () => ({
        url: '/admin/idea/approved',
        method: 'GET',
      }),
      providesTags: ['idea'],
    }),

    //Get pending ideas
    getPendingIdeas: builder.query({
      query: () => ({
        url: '/admin/idea/pending',
        method: 'GET',
      }),
      providesTags: ['idea'],
    }),
  }),
});

export const {
  useGetAllIdeasQuery,
  useApproveIdeaMutation,
  useGetApprovedIdeasQuery,
  useGetPendingIdeasQuery,
} = ideaManagementApi;
