import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5002/api/v1/',
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
      query: () => 'messages',
      providesTags: (result) =>
        result
          ? result.map((message) => ({
              type: 'Messages',
              id: message.channelId,
            }))
          : [],
    }),
    addMessage: build.mutation({
      query: (body) => ({
        url: 'messages',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [{ type: 'Messages', id: result.channelId }],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
