import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5002',
  }),
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: 'api/v1/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signupUser: build.mutation({
      query: (credentials) => ({
        url: 'api/v1/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useSignupUserMutation } = authApi;
