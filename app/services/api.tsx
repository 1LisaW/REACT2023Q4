import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { MTGModel } from '../api/api';

const BASE_URL = 'https://api.magicthegathering.io/v1/';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const cardMTGsApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getMTGCards: builder.query<
      Record<'cards', MTGModel[] | never[]>,
      { name: string; page: string; pageSize: string }
    >({
      query(arg) {
        const { name = '', page = '1', pageSize = '3' } = arg;
        return {
          url: 'cards',
          params: { name, page, pageSize },
        };
      },
    }),
    getMTGCard: builder.query<Record<'card', MTGModel | never>, { id: string }>({
      query(arg) {
        const { id } = arg;
        return {
          url: `cards/${id}`,
        };
      },
    }),
  }),
});

export const { useGetMTGCardsQuery, useGetMTGCardQuery } = cardMTGsApi;
export const { getMTGCards, getMTGCard } = cardMTGsApi.endpoints;
