import Search from '../Search/Search';
import './Root.css';
import {
  LoaderFunction,
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { useStateStore } from '../StateContext/SearchContext';
import { MTGModel, getMTGCardsData } from '../api/api';

export const loader: LoaderFunction = async ({
  request,
}): Promise<MTGModel[] | never[]> => {
  const url = new URL(request.url);
  const search = url.searchParams.get('name') || '';
  const pageSize = url.searchParams.get('pageSize') || '';
  const page = url.searchParams.get('page') || '';
  const searchData = await getMTGCardsData({
    name: search,
    pageSize: Number(pageSize) || 3,
    page: Number(page) || 1,
  });
  return searchData;
};

const Root = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '3'));
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const searchData = useLoaderData() as MTGModel[] | never[];
  const {
    text,
    actions: { setText, setResult },
  } = useStateStore();

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate({
        pathname: '/cards',
      });
    } else {
      setText(searchParams.get('name') || '');
    }
  }, []);
  useEffect(() => {
    setResult(searchData);
  }, [searchData, setResult]);

  const changePageSize = (value: string) => {
    setPage(1);
    setPageSize(Number(value));
    setSearchParams({ name: text, pageSize: value, page: '1' });
  };
  const handlePagination = (value: number) => {
    setPage(value);
    setSearchParams({
      name: text,
      pageSize: pageSize.toString(),
      page: value.toString(),
    });
  };
  return (
    <>
      <Header />
      <Search />
      <select value={pageSize} onChange={(e) => changePageSize(e.target.value)}>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <Outlet context={{ page: page, onClick: handlePagination }} />
    </>
  );
};

export default Root;
