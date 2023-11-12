import { ChangeEvent, useState } from 'react';
import { useStateStore } from '../StateContext/SearchContext';
import classes from './Search.module.css';
import { Form, useSearchParams } from 'react-router-dom';
import { getStorageData, setStorageData } from '../store/storage';

const Search = () => {
  const [searchParams] = useSearchParams();
  const {
    actions: { setText },
  } = useStateStore();
  const [searchText, setSearchText] = useState(getStorageData() || '');

  return (
    <Form
      className={classes.searchWrapper}
      role="search"
      relative="path"
      onSubmit={() => {
        setText(searchText);
        setStorageData(searchText);
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
        value={searchText || ''}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchText(event.target.value);
        }}
      ></input>
      <button className={classes.buttonSearch}>Search</button>
      <button className={classes.buttonSearch}>Error</button>
    </Form>
  );
};

export default Search;
