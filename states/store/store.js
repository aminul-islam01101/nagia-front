// import {
//   combineReducers,
//   configureStore,
//   getDefaultMiddleware,
// } from "@reduxjs/toolkit";
// import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import { apiSlice } from "../slices/apiSlice";
// import authReducer from "../slices/authSlice";
// // import postReducer from "./post/postSlice";
// import { persistConfig } from "../slices/authApiSlice";
// import { persistReducer } from "redux-persist";

// const combinedReducer = combineReducers({
//   // auth: authReducer,
//   auth: persistReducer(persistConfig, authReducer),
//   [apiSlice.reducerPath]: apiSlice.reducer,
// });

// const masterReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload,
//       [apiSlice.reducerPath]: apiSlice.reducer,
//       //       // postReducer: {
//       //       //   users: [...action.payload.users.users, ...state.users.users],
//       //       // },
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// export const makeStore = () =>
//   configureStore({
//     reducer: masterReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(apiSlice.middleware),
//   });

// export const wrapper = createWrapper(makeStore, { debug: true });

import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { rootReducer } from '../root-reducer';
import { authApi } from '../services/authApi';
import { adminApi } from '../services/adminApi';
import { userApi } from '../services/userApi';
import { overlappingApi } from '../services/overlappingApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
    authApi.middleware,
    adminApi.middleware,
    userApi.middleware,
    overlappingApi.middleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
});

export const persistor = persistStore(store);
