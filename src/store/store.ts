import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./auth/authSlice";
import sessionStorage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  version: 1,
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    }).concat(apiSlice.middleware),

  devTools: false,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
