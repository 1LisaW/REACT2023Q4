import { ChangeEvent, useState } from 'react';
import classes from './Search.module.css';
import { setStorageData } from '../../app/services/storage';
import { useAppDispatch } from '../../app/store';
import { setSearchText } from '../../app/slices/searchTextSlice';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const Search = (props: { name: string }) => {
  const { name } = props;
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState(name || '');

  return (
    <form
      className={classes.searchWrapper}
      role="search"
      onSubmit={() => {
        dispatch(setSearchText(searchValue || ''));
        if (window) setStorageData(searchValue);
      }}
    >
      <input type="hidden" name="pageSize" value={searchParams.get('pageSize') || ''} />
      <input type="hidden" name="page" value={searchParams.get('page') || '1'} />
      <input
        className={classes.inputSearch}
        aria-label="search"
        placeholder="Search"
        type="search"
        name="name"
        value={searchValue || ''}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchValue(event.target.value);
        }}
      ></input>
      <button className={classes.buttonSearch}>Search</button>
      <button className={classes.buttonSearch}>Error</button>
    </form>
  );
};

export default Search;
