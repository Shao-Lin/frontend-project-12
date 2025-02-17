import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
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
  tagTypes: ['Channels', 'Messages'],
  endpoints: (build) => ({
    getChannels: build.query({
      query: () => '/api/v1/channels',
      providesTags: ['Channels'],
    }),
    addChannel: build.mutation({
      query: (body) => ({
        url: '/api/v1/channels',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Channels'],
    }),
    deleteChannel: build.mutation({
      query: (id) => ({
        url: `/api/v1/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Channels' },
        { type: 'Messages', id },
      ],
    }),
    patchChannel: build.mutation({
      query: ({ id, channelName }) => ({
        url: `/api/v1/channels/${id}`,
        method: 'PATCH',
        body: { name: channelName },
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useDeleteChannelMutation,
  usePatchChannelMutation,
} = channelsApi;
