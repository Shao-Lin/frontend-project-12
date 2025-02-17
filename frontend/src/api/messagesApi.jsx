import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5002',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => '/api/v1/messages',
    }),
    addMessage: build.mutation({
      query: (body) => ({
        url: '/api/v1/messages',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [{ type: 'Messages', id: result.channelId }],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
