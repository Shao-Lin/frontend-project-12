import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5002/api/v1' }),
  tagTypes: ['Messages'],
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => `messages`,
      providesTags: ['Messages'],
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;
