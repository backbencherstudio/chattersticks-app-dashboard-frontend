import baseApi from '../../baseApi';

const ideaManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllIdeas: builder.query({
      query: params => ({
        url: '/admin/idea/all',
        method: 'GET',
        params: params,
      }),
      providesTags: ['idea'],
    }),

   
  }),
});

export const {
  useGetAllIdeasQuery
} = ideaManagementApi;
