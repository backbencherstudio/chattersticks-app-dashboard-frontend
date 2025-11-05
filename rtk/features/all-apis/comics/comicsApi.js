import baseApi from "../../baseApi";

const ComicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreateComic: builder.mutation({
      query: (data) => ({
        url: "/admin/comic",
        method: "POST",
        body:data
      }),
     
    }),
    getAllComics: builder.query({
      query: (params) => ({
        url: "/admin/comic/dashboard",
        method: "GET",
        params: params,
      }),
     
    }),
  }),
});

export const { useGetAllComicsQuery, useCreateComicMutation } = ComicApi;


