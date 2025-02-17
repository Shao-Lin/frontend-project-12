import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
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
      query: () => '/channels',
      providesTags: ['Channels'],
    }),
    addChannel: build.mutation({
      query: (body) => ({
        url: 'channels',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Channels'],
    }),
    deleteChannel: build.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Channels' },
        { type: 'Messages', id },
      ],
    }),
    patchChannel: build.mutation({
      query: ({ id, channelName }) => ({
        url: `channels/${id}`,
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
