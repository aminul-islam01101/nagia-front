import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, createRequest } from './shared';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: ({ values, type }) => {
        return {
          url: `http://localhost:5005/api/v1/user/account/signup`,
          method: 'post',
          body: values,
        };
      },
    }),
    activateUser: builder.mutation({
      query: (data) => {
        return {
          url: `activate-user`,
          method: 'post',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (data, type) => {
        return {
          url: `http://localhost:5005/api/v1/user/account/login`,
          method: 'post',
          body: data,
        };
      },
    }),
    loginAdmin: builder.mutation({
      query: (data, type) => {
        return {
          url: `http://localhost:5005/api/v1/admin/account/login`,
          method: 'post',
          body: data,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `user/account/forgot-password`,
          method: 'post',
          body: data,
        };
      },
    }),
    verifyForgotToken: builder.mutation({
      query: (data) => {
        return {
          url: `password/token/verify`,
          method: 'post',
          body: data,
        };
      },
    }),

    logoutUser: builder.query({
      query: () => createRequest('user/account/logout'),
    }),
    resetPassword: builder.mutation({
      query: ({ values, token }) => {
        return {
          url: `/user/account/reset-password/${token}`,
          method: 'post',
          body: values,
        };
      },
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLoginAdminMutation,
  useLogoutUserQuery,
  useForgotPasswordMutation,
  useVerifyForgotTokenMutation,
  useResetPasswordMutation,
} = authApi;
