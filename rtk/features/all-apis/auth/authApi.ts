import baseApi from "@/rtk/features/baseApi";

// Define the auth API endpoints
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    //Admin Profile
    admin: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['admin'],
    }),
    // FORGOT PASSWORD - send OTP or reset link
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    // VERIFY OTP
    verifyOtp: builder.mutation({
      query: ({ email, otp }: { email: string; otp: string }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),

    // RESET PASSWORD
    resetPassword: builder.mutation({
      query: ({
        email,
        password,
        token,
      }: {
        email: string;
        password: string;
        token: string;
      }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { email, newPassword: password, token },
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    updateProfile: builder.mutation({
      query: (formData) => {
        return {
          url: "/auth/update",
          method: "PATCH",
          body: formData,
        };
      },
    }),

    getMe: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useGetMeQuery
} = authApi;
