import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '../app/store';
import React from 'react';

export const getServerSideProps: GetServerSideProps<Record<string, never>> =
  wrapper.getServerSideProps(() => async (context) => {
    if (context.resolvedUrl === '/')
      return {
        redirect: {
          destination: '/cards',
          permanent: false,
        },
      };
    return {
      props: {},
    };
  }) satisfies GetServerSideProps<Record<string, never>>;

export default function Home({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <></>;
}
