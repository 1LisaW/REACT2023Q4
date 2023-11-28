import React from 'react';
import { useLoadingSelector } from '../../../app/slices/loadingSlice';
import { cardMTGsApi } from '../../../app/services/api';
import { setPageSize } from '../../../app/slices/pageSizeSlice';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import PropsI from '../../propsI';
import { setSearchText } from '../../../app/slices/searchTextSlice';
import { MTGModel } from '../../../app/api/api';
import { wrapper } from '../../../app/store';
import { setFromQueryParams } from '../../../app/slices/pageSlice';
import Layout from '../../../components/layout';
import Details from '../../../components/Result/Details/Details';
import Spinner from '../../../components/Spinner/Spinner';

export default function DetailsPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const loading = useLoadingSelector();
  return (
    <Layout data={data}>
      {loading.loadingDetails ? <Spinner /> : <Details data={data} />}
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let text = store.getState().searchText.text;
    const params = context.params;
    console.log(params?.id);
    const {
      name = '',
      page = '1',
      pageSize = '3',
    } = context.query as Record<string, string>;
    let cards: { cards: MTGModel[] | never[] } = { cards: [] };
    let details: Record<'card', MTGModel> | null = null;
    if (typeof name === 'string' && !text) {
      await store.dispatch(setSearchText(name));
      if (!text) text = name;
      if (typeof page === 'string') await store.dispatch(setFromQueryParams(+page));
      if (typeof pageSize === 'string') await store.dispatch(setPageSize(+pageSize));

      // await store.dispatch(toggleLoadingCards(true));
      // await store.dispatch(toggleLoadingDetails(true));
      const resp = await store.dispatch(
        cardMTGsApi.endpoints.getMTGCards.initiate({
          name: text,
          page,
          pageSize,
        }),
      );
      // await store.dispatch(toggleLoadingCards(false));
      if (resp.data) cards = resp.data;
      const detailResp = await store.dispatch(
        cardMTGsApi.endpoints.getMTGCard.initiate({ id: (params?.id as string) || '' }),
      );
      // await store.dispatch(toggleLoadingDetails(false));
      if (detailResp.data) details = detailResp.data;
    }
    return {
      props: {
        data: {
          name: text,
          page,
          pageSize,
          cards,
          details,
          loadings: store.getState().loadings,
        },
      },
    };
  },
) satisfies GetServerSideProps<{
  data: PropsI;
}>;
