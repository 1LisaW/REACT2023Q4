import Head from 'next/head';
import styles from './layout.module.css';
// import Link from "next/link";
import React from 'react';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import PropsI from '../pages/propsI';
import SearchResult from '../components/Result/SearchResult';
import PageSizeComponent from './PageSize/PageSize';
import Pagination from './Result/Pagination/Pagination';

const name = 'RTK-Query SSR example';
export const siteTitle = name;

export default function Layout({
  children,
  data,
}: {
  children?: React.ReactNode;
  // home?: boolean;
  data: PropsI;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="MTG" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <Header />
        <Search name={data.name} />
        <PageSizeComponent pageSize={data.pageSize} />
        <div className={styles.result}>
          <SearchResult data={data} />
          {children}
        </div>
        <Pagination />
      </main>
    </div>
  );
}
