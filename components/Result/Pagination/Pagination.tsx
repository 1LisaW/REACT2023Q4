'use client';
// import { useOutletContext, useSearchParams } from 'react-router-dom';
import classes from './Pagination.module.css';
import { setFromQueryParams } from '../../../app/slices/pageSlice';
import React from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '../../../app/store';

// type OutletProps = {
//   page: number;
//   onClick: (value: number) => void;
// };

const Pagination = () => {
  const router = useRouter();
  const { query } = router;
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const page = query.page || 1;
  // const content: OutletProps = useOutletContext();
  // const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value: number) => {
    dispatch(setFromQueryParams(value));
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', String(value));
    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${router.pathname}${query}`);
  };
  return (
    <div className={classes.paginationWrapper}>
      <button
        disabled={+page === 1 ? true : false}
        onClick={() => handleClick(+page - 1)}
      >
        Left
      </button>
      <div>{page}</div>
      <button
        disabled={+page === 10 ? true : false}
        onClick={() => handleClick(+page + 1)}
      >
        Right
      </button>
    </div>
  );
};

export default Pagination;
