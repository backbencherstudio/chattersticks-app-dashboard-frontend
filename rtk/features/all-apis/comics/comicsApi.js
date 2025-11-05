import baseApi from "../../baseApi";

const ComicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComics: builder.query({
      query: (params) => ({
        url: "/admin/comic/dashboard",
        method: "GET",
        params: params,
      }),
     
    }),
  }),
});

export const { useGetAllComicsQuery } = ComicApi;


