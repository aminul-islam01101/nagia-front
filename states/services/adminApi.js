import { createApi } from '@reduxjs/toolkit/query/react';
import {
  baseQueryWithReauth,
  createRequest,
  createRequestWithParams,
} from './shared';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users', 'News', 'Opportunities'],

  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => {
        return {
          url: `admin/dashboard/users/send-mail`,
          method: 'post',
          body: data,
        };
      },
    }),
    getAllUsers: builder.query({
      query: ({ limit, page }) =>
        createRequestWithParams(`http://localhost:5005/api/v1/admin/dashboard/users`, {
          page,
          limit,
        }),
      providesTags: ['Users'],
    }),
    getUsersProductApprove: builder.query({
      query: ({ limit, page }) =>
        createRequestWithParams(`http://localhost:5005/api/v1/admin/dashboard/transaction/approve/sell`, {
          page,
          limit,
        }),
        providedTags:['sell']
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/dashboard/users/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: ['Users'],
    }),
    deleteSell: builder.mutation({
      query: (id) => {
        return {
          url: `http://localhost:5005/api/v1/delete-sell`,
          method: 'delete',
        };
      },
      
    }),
    deleteUserInvestment: builder.mutation({
      query: (id) => {
        return {
          url: `http://localhost:5005/api/v1/delete-user-investment`,
          method: 'delete',
        };
      },
      
    }),
    deleteTransactions: builder.mutation({
      query: (id) => {
        return {
          url: `http://localhost:5005/api/v1/delete-transaction`,
          method: 'delete',
        };
      },
      
    }),
    approveTransaction: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/transactions/approve`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
    getAllTransactions: builder.query({
      query: ({ limit, page }) =>
        createRequestWithParams(`http://localhost:5005/api/v1/admin/dashboard/transactions`, {
          page,
          limit,
        }),
    }),

    createInvestorNews: builder.mutation({
      query: (data) => {
        return {
          url: `admin/dashboard/investor-news`,
          method: 'post',
          body: data,
        };
      },
    }),
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-opportunities`,
          method: 'post',
          body: data,
        };
      },
    }),
    deleteNews: builder.mutation({
      query: (newsId) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-news/${newsId}`,
          method: 'DELETE',
        };
      },
    }),
    deleteOpportunity: builder.mutation({
      query: (oppId) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-opportunities/${oppId}`,
          method: 'DELETE',
        };
      },
    }),
    updateOpportunity: builder.mutation({
      query: ({ id, values }) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-opportunities/${id}`,
          method: 'PATCH',
          body: values,
        };
      },
    }),
    updateNews: builder.mutation({
      query: ({ id, values }) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-news/${id}`,
          method: 'PATCH',
          body: values,
        };
      },
    }),
    getAccountDetailsAdmin: builder.query({
      query: (accountId) =>
        createRequestWithParams(
          `http://localhost:5005/api/v1/admin/dashboard/account-details/${accountId}`
        ),
    }),
    adminBuyProduct: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/buy`,
          method: 'post',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useApproveTransactionMutation,
  useCreateInvestorNewsMutation,
  useCreateProductMutation,
  useGetUsersProductApproveQuery,
  useGetAllTransactionsQuery,
  useDeleteNewsMutation,
  useDeleteOpportunityMutation,
  useUpdateOpportunityMutation,
  useUpdateNewsMutation,
  useGetAccountDetailsAdminQuery,
  useDeleteSellMutation,
  useDeleteUserInvestmentMutation,
  useDeleteTransactionsMutation,
  useAdminBuyProductMutation
  
} = adminApi;

// providesTags: ['Users'],
