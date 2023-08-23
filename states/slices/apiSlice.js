import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials, logOut } from "./authSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://localhost:8000/', //Local//
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  prepareHeaders: async (headers, { getState }) => {
    const token = await getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      // headers.set('Content-Type', 'multipart/form-data');
      headers.set('Access-Control-Allow-Credentials', true);
      headers.set('Accept', 'multipart/form-data');
      headers.set('Access-Control-Allow-Origin', '*');
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    // console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
