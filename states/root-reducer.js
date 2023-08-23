import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { authApi } from './services/authApi';
import { adminApi } from './services/adminApi';

import authReducer, { persistConfig } from './slices/auth';
import { userApi } from './services/userApi';
import { overlappingApi } from './services/overlappingApi';

export const reducers = combineReducers({
  authStore: persistReducer(persistConfig, authReducer),
  [authApi.reducerPath]: authApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [overlappingApi.reducerPath]: overlappingApi.reducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    return reducers(undefined, action);
  }
  return reducers(state, action);
};
