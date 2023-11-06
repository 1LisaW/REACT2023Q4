import Search from '../Search/Search';
import './Root.css';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';

const Root = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '3'));
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate({
        pathname: '/cards',
      });
    }
  }, []);

  const changePageSize = (value: string) => {
    setPage(1);
    setPageSize(Number(value));
    setSearchParams({ name: searchParams.get('name') || '', pageSize: value, page: '1' });
  };
  const handlePagination = (value: number) => {
    setPage(value);
    setSearchParams({
      name: searchParams.get('name') || '',
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
