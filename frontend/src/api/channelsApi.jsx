import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
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
  tagTypes: ['Channels'],
  endpoints: (build) => ({
    getChannels: build.query({
      query: () => `channels`,
      providesTags: ['Channels'],
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;
