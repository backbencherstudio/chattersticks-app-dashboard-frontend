import baseApi from "../../baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: (params) => ({
        url: "/setting/terms-and-conditions",
        method: "GET",
        params: params,
      }),
      providesTags: ["setting"],
    }),

    getPrivacyPolicy: builder.query({
      query: (params) => ({
        url: "/setting/privacy-policy",
        method: "GET",
        params: params,
      }),
      providesTags: ["setting"],
    }),

    getFaq: builder.query({
      query: (params) => ({
        url: "/setting/faq-section",
        method: "GET",
        params: params,
      }),
      providesTags: ["setting"],
    }),

    createTermsAndCondition: builder.mutation({
      query: ({ params, body }) => ({
        url: "/setting/terms-and-conditions",
        method: "POST",
        body: body,
        params: params,
      }),
      invalidatesTags: ["setting"],
    }),

    createPrivacyPolicy: builder.mutation({
      query: ({ params, body }) => ({
        url: "/setting/privacy-policy",
        method: "POST",
        body: body,
        params: params,
      }),
      invalidatesTags: ["setting"],
    }),

    createFaq: builder.mutation({
      query: ({ params, body }) => ({
        url: "/setting/faq-section",
        method: "POST",
        body: body,
        params: params,
      }),
      invalidatesTags: ["setting"],
    }),

    updateTermsAndCondition: builder.mutation({
      query: ({ params, body }) => ({
        url: `/setting/terms-and-conditions`,
        method: "PATCH",
        body: body,
        params: params,
      }),
      invalidatesTags: ["setting"],
    }),

    updatePrivacyPolicy: builder.mutation({
      query: ({ params, body }) => ({
        url: `/setting/privacy-policy`,
        method: "PATCH",
        body: body,
        params: params,
      }),
      invalidatesTags: ["setting"],
    }),

    updateFaq: builder.mutation({
      query: ({ params, body }) => ({
        url: `/setting/faq-section`,
        method: "PATCH",
        body: body,
        params: params,
      }),
      invalidatesTags: ["setting"],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useGetPrivacyPolicyQuery,
  useGetFaqQuery,
  useCreateTermsAndConditionMutation,
  useCreatePrivacyPolicyMutation,
  useCreateFaqMutation,
  useUpdateTermsAndConditionMutation,
  useUpdatePrivacyPolicyMutation,
  useUpdateFaqMutation,
} = settingApi;
