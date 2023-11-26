import React from 'react';
// import { wrapper } from "../../app/store";
// import { cardMTGsApi, useGetMTGCardsQuery } from "../../app/services/api";
// import StoreInitializer from "../../components/StoreInitializer/StoreInitializer";
// import Search from "../../components/Search/Search";
import { wrapper } from '../../app/store';
import { setSearchText } from '../../app/slices/searchTextSlice';
import { setFromQueryParams } from '../../app/slices/pageSlice';
import { setPageSize } from '../../app/slices/pageSizeSlice';
import { cardMTGsApi } from '../../app/services/api';
import { MTGModel } from '../../app/api/api';
import Layout from '../../components/layout';
import PropsI from '../propsI';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { toggleLoadingCards, toggleLoadingDetails } from '../../app/slices/loadingSlice';
import StoreInitializer from '../../components/StoreInitializer/StoreInitializer';

export default function MainPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <StoreInitializer>
      <Layout data={data} />
    </StoreInitializer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let text = store.getState().searchText.text;
    const {
      name = '',
      page = '1',
      pageSize = '3',
    } = context.query as Record<string, string>;
    let cards: { cards: MTGModel[] | never[] } = { cards: [] };
    if (typeof name === 'string' && !text) {
      await store.dispatch(setSearchText(name));
      if (!text) text = name;
      if (typeof page === 'string') await store.dispatch(setFromQueryParams(+page));
      if (typeof pageSize === 'string') await store.dispatch(setPageSize(+pageSize));

      const resp = await store.dispatch(
        cardMTGsApi.endpoints.getMTGCards.initiate({
          name: text,
          page,
          pageSize,
        }),
      );
      await store.dispatch(toggleLoadingCards(false));
      await store.dispatch(toggleLoadingDetails(false));
      cards = { cards: [] };
      if (resp.data) cards = resp.data;
    }
    return {
      props: {
        data: {
          name: text,
          page,
          pageSize,
          cards,
          loadings: store.getState().loadings,
        },
      },
    };
  },
) satisfies GetServerSideProps<{
  data: PropsI;
}>;
