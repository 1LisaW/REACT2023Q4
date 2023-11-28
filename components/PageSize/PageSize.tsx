import React from 'react';
import { useAppDispatch } from '../../app/store';
import { setPageSize } from '../../app/slices/pageSizeSlice';
import { useRouter } from 'next/router';
import { toggleLoadingCards } from '../../app/slices/loadingSlice';

const PageSizeComponent = ({ pageSize }: { pageSize: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const changePageSize = async (value: string) => {
    dispatch(toggleLoadingCards(true));
    dispatch(setPageSize(+value));
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, pageSize: value },
    });
    dispatch(toggleLoadingCards(false));
  };
  return (
    <select value={pageSize} onChange={(e) => changePageSize(e.target.value)}>
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
  );
};

export default PageSizeComponent;
