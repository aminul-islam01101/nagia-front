import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { includes, isEmpty } from 'lodash';
import { setLoginUser, setNewAccess } from '../slices/auth';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const baseQueryWithoutHeader = fetchBaseQuery({
  baseUrl: baseUrl,
});

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  // credentials: includes,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const authorization = getState()?.authStore.authorization;
    const refresh = getState()?.authStore.user.refreshToken;

    if (authorization?.accessToken && endpoint !== 'refresh') {
      headers.set('Authorization', `Bearer ${authorization?.accessToken}`);
    } else {
      headers.set('Authorization', `Bearer ${refresh}`);
    }
    return headers;
  },
});

const mutex = new Mutex();

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const authorization = api.getState()?.authStore.authorization;
  if (
    result.error &&
    result.error.status === 400 &&
    !isEmpty(authorization?.accessToken)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const response = await baseQuery(
          {
            url: 'admin/account/refresh-token',
            method: 'post',
            body: {
              token: api.getState().authStore.user.refreshToken ?? '',
            },
          },
          { ...api, endpoint: 'refresh' },
          extraOptions
        );
        if (response.data) {
          api.dispatch(setNewAccess(response.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch({ type: 'LOGOUT' });
          // window.location.replace("/");
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
export const createRequest = (url) => ({ url });
export const createRequestWithParams = (url, params) => ({
  url,
  params: params,
});
