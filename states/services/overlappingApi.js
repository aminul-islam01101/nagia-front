import { createApi } from '@reduxjs/toolkit/query/react';
import {
  baseQueryWithReauth,
  createRequest,
  createRequestWithParams,
} from './shared';

export const overlappingApi = createApi({
  reducerPath: 'overlappingApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['News', 'Opportunities','opportunityTitles' ],

  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: ({ page, limit }) =>
        createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/news`, {
          page,
          limit,
        }),
      providesTags: ['News'],
    }),
    getAllOpportunities: builder.query({
      query: ({ limit, page }) =>
        createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/opportunity`, {
          page,
          limit,
        }),
      providesTags: ['Opportunities'],
    }),
    getAllOpportunityTitles: builder.query({
      query: () =>
        createRequestWithParams(`http://localhost:5005/api/v1/user/dashboard/opportunity-titles`, ),
      providesTags: ['opportunityTitles'],
    }),
    createInvestorNews: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-news`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['News'],
    }),
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-opportunities`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['Opportunities', 'opportunityTitles'],
    }),
    deleteNews: builder.mutation({
      query: (newsId) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-news/${newsId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['News'],
    }),
    deleteOpportunity: builder.mutation({
      query: (oppId) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-opportunities/${oppId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Opportunities'],
    }),
    updateOpportunity: builder.mutation({
      query: ({ id, values }) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-opportunities/${id}`,
          method: 'PATCH',
          body: values,
        };
      },
      invalidatesTags: ['Opportunities'],
    }),
    updateNews: builder.mutation({
      query: ({ id, values }) => {
        return {
          url: `http://localhost:5005/api/v1/admin/dashboard/investor-news/${id}`,
          method: 'PATCH',
          body: values,
        };
      },
      invalidatesTags: ['News'],
    }),
    contact: builder.mutation({
      query: (values) => {
        return {
          url: `/contact-us`,
          method: 'post',
          body: values,
        };
      },
    }),
  }),
});

export const {
  useCreateInvestorNewsMutation,
  useCreateProductMutation,
  useDeleteNewsMutation,
  useDeleteOpportunityMutation,
  useUpdateOpportunityMutation,
  useUpdateNewsMutation,
  useGetAllNewsQuery,
  useGetAllOpportunitiesQuery,
  useGetAllOpportunityTitlesQuery,
  useContactMutation,
} = overlappingApi;

// providesTags: ['Users'],
