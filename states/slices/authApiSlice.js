import { apiSlice } from './apiSlice';
import storageSession from 'redux-persist/lib/storage/session';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/account/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/user/account/signup',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: '/api/user/updateMe',
        method: 'PATCH',
        body: { ...credentials },
      }),
    }),
  }),
});

export const persistConfig = {
  storageSession,
  key: 'root',
};

export const { useLoginMutation, useSignupMutation, useUpdateUserMutation } =
  authApiSlice;
