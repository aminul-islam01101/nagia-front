import { createSlice } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';

const initialState = {
  user: {},
  authorization: { accessToken: '' },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginUser: (state, { payload }) => {
      state.user = payload?.data;
      state.authorization.accessToken = payload?.data.accessToken;
    },
    setNewAccess: (state, { payload }) => {
      state.user.refreshToken = payload?.data.refreshToken;
      state.user.accessToken = payload?.data.accessToken;
      state.authorization.accessToken = payload?.data.accessToken;
    },
  },
});

export const persistConfig = {
  storage: storageSession,
  key: 'root',
};

export const { setLoginUser, setNewAccess } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
