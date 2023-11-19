import Search from '../Search/Search';
import './Root.css';
import { LoaderFunction, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../Header/Header';
import { store, useAppDispatch } from '../app/store';
import { setFromQueryParams, usePageSelector } from '../app/slices/pageSlice';
import { setPageSize, usePageSizeSelector } from '../app/slices/pageSizeSlice';
import { setSearchText, useTextSelector } from '../app/slices/searchTextSlice';
import { cardMTGsApi } from '../app/services/api';

export const loader: LoaderFunction = async ({ request }): Promise<null> => {
  const url = new URL(request.url);
  const search = url.searchParams.get('name') || '';
  const pageSize = url.searchParams.get('pageSize') || '';
  const page = url.searchParams.get('page') || '';
  await store.dispatch(
    cardMTGsApi.endpoints.getMTGCards.initiate({ name: search, page, pageSize }),
  );
  return null;
};

const Root = () => {
  const page = usePageSelector();
  const pageSize = usePageSizeSelector();
  const searchText = useTextSelector();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(page);

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate({
        pathname: '/cards',
      });
    } else {
      dispatch(setSearchText(searchParams.get('name') || ''));
    }
  }, []);

  const changePageSize = (value: string) => {
    dispatch(setFromQueryParams(1));
    dispatch(setPageSize(Number(value)));
    setSearchParams({ name: searchText, pageSize: value, page: '1' });
  };
  const handlePagination = (value: number) => {
    dispatch(setFromQueryParams(value));
    setSearchParams({
      name: searchText,
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
