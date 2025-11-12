import baseApi from "../../baseApi";

const ComicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreateComic: builder.mutation({
      query: (data) => ({
        url: "/admin/comic",
        method: "POST",
        body: data,
      }),
    }),
    getAllComics: builder.query({
      query: (params = {}) => ({
        url: "/admin/comic",
        method: "GET",
        params,
      }),
    }),

    getDashboardComics: builder.query({
      query: () => ({
        url: "/admin/comic/dashboard",
        method: "GET",
      }),
    }),
    getSingleComic: builder.query({
      query: (id) => ({
        url: `/admin/comic/${id}`,
        method: "GET",
      }),
    }),
    getSingleDetailsComic: builder.query({
      query: (id) => ({
        url: `/comics/${id}`,
        method: "GET",
      }),
    }),
    updateComic: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/comic/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteComic: builder.mutation({
      query: (id) => ({
        url: `/admin/comic/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllComicsQuery,
  useGetSingleComicQuery,
  useGetSingleDetailsComicQuery,
  useCreateComicMutation,
  useUpdateComicMutation,
  useDeleteComicMutation,
  useGetDashboardComicsQuery,
} = ComicApi;
