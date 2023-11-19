import { ChangeEvent, useState } from 'react';
import classes from './Search.module.css';
import { Form, useSearchParams } from 'react-router-dom';
import { getStorageData, setStorageData } from '../store/storage';
import { useAppDispatch } from '../app/store';
import { setSearchText } from '../app/slices/searchTextSlice';

const Search = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState(getStorageData() || '');

  return (
    <Form
      className={classes.searchWrapper}
      role="search"
      relative="path"
      onSubmit={() => {
        dispatch(setSearchText(searchValue || ''));
        setStorageData(searchValue);
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
    </Form>
  );
};

export default Search;
