import { createApi } from '@reduxjs/toolkit/query/react';
import {
  baseQueryWithReauth,
  createRequest,
  createRequestWithParams,
} from './shared';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Notification', 'transaction'],

  endpoints: (builder) => ({
    // getAllNews: builder.query({
    //   query: ({ page, limit }) =>
    //     createRequestWithParams(`user/dashboard/news`, {
    //       page,
    //       limit,
    //     }),
    // }),
    // getAllOpportunities: builder.query({
    //   query: ({ limit, page }) =>
    //     createRequestWithParams(`user/dashboard/opportunity`, {
    //       page,
    //       limit,
    //     }),
    // }),
    getOpportunity: builder.query({
      query: ({ id }) =>
        createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/opportunity/${id}`),
    }),
    getTransactionHistory: builder.query({
      query: ({ limit, page }) =>
        createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/transaction-history`, {
          page,
          limit,
        }),
        providesTags: ['transaction'],
    }),
    getUserInvestmentDetails: builder.query({
      query: ({ limit, page, userId }) =>
        createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/${userId}/investment`, {
          page,
          limit,
        }),
    }),
    updatePassword: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/user/dashboard/password`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
    updateUserInfo: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/user/dashboard/user-info`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
    buyProduct: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/user/dashboard/buy`,
          method: 'post',
          body: data,
        };
      },
    }),
    checkout: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/user/account/checkout`,
          method: 'post',
          body: data,
        };
      },
    }),
    sellProduct: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/user/dashboard/sell`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['transaction',],
    }),

    verifyPayment: builder.query({
      query: ({ reference, userInvestmentId, checkoutId }) =>
        createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/paystack/verify`, {
          reference,
          userInvestmentId,
          checkoutId,
        }),
    }),

    getAccountDetails: builder.query({
      query: (accountId) =>
        createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/account-details/${accountId}`),
    }),
    getStats: builder.query({
      query: () => createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/investment-stats`),
    }),

    getChartStats: builder.query({
      query: () =>
        createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/transactions/stats`),
    }),
    addAccount: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/user/dashboard/account-details`,
          method: 'post',
          body: data,
        };
      },
    }),
    // NOTIFICATIONS

    getAllNotfications: builder.query({
      query: () => createRequestWithParams(`http://localhost:5005/api/v1/user/notifications`),
      providesTags: ['Notification'],
    }),

    getNotficationByID: builder.query({
      query: (id) => createRequestWithParams(`http://localhost:5005/api/v1/user/notifications${id}`),
    }),

    deleteNotfication: builder.mutation({
      query: (id) => {
        return {
          url: `http://localhost:5005/api/v1/user/notifications/${id}`,
          method: 'DELETE',
        };
      },
    }),
    markNotficationAsRead: builder.mutation({
      query: (id) => {
        return {
          url: `http://localhost:5005/api/v1/user/notifications/${id}/mark-as-read`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Notification'],
    }),
    getCheckoutDetails: builder.query({
      query: () => createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/checkout`),
    }),
  }),
});

export const {
  // useGetAllNewsQuery,
  // useGetAllOpportunitiesQuery,
  useGetTransactionHistoryQuery,
  useUpdatePasswordMutation,
  useUpdateUserInfoMutation,
  useBuyProductMutation,
  useSellProductMutation,
  useAddAccountMutation,
  useVerifyPaymentQuery,
  useVerifyPaymentMutation,
  useGetAccountDetailsQuery,
  useGetUserInvestmentDetailsQuery,
  useGetStatsQuery,
  useGetAllNotficationsQuery,
  useGetNotficationByIDQuery,
  useDeleteNotficationMutation,
  useMarkNotficationAsReadMutation,
  useGetOpportunityQuery,
  useGetChartStatsQuery,
  useCheckoutMutation,
  useGetCheckoutDetailsQuery,
} = userApi;
