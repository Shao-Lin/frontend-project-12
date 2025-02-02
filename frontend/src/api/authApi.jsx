import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5002/api',
  }),
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: 'v1/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
