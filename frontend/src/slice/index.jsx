import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from '../api/authApi';
import { channelsApi } from '../api/channelsApi';
import { messagesApi } from '../api/messagesApi';

export const store = configureStore({
  reducer: {
    authUsers: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      channelsApi.middleware,
      messagesApi.middleware
    ),
});
