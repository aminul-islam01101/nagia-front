// import { reduxBatch } from "@manaflair/redux-batch";
// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore } from "redux-persist";

// import { rootReducer } from "../root-reducer";
// import { authApi } from "../services/authApi";
// import { adminApi } from "../services/adminApi";
// import { userApi } from "../services/userApi";

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => [
//     ...getDefaultMiddleware({
//       immutableCheck: false,
//       serializableCheck: false,
//       thunk: true,
//     }),
//     authApi.middleware,
//     adminApi.middleware,
//     userApi.middleware,
//   ],
//   devTools: process.env.NODE_ENV !== "production",
//   enhancers: [reduxBatch],
// });

// export const persistor = persistStore(store);
