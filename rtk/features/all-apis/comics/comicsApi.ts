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
      query: (params) => ({
        url: "/admin/comic",
        method: "GET",
        params: params,
      }),
    }),
    updateComic: builder.query({
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
  useCreateComicMutation,
  useUpdateComicQuery,
  useDeleteComicMutation,
} = ComicApi;
