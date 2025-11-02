import baseApi from "../../baseApi";

const paymentAndWithdrawsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaymentsAndWithdraws: builder.query({
      query: () => "/dashboard/payments-and-withdraws",
      providesTags: ["payment"],
    }),
  }),
});

export const { useGetAllPaymentsAndWithdrawsQuery } = paymentAndWithdrawsApi;
