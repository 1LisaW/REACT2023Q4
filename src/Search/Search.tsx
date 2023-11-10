import { ChangeEvent, useEffect, useState } from 'react';
import { useStateStore } from '../StateContext/SearchContext';
import classes from './Search.module.css';
import { Form, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  const {
    text,
    actions: { setText },
  } = useStateStore();
  const [searchText, setSearchText] = useState(text || '');

  useEffect(() => {
    setSearchText(text);
  }, [text]);

  return (
    <Form
      className={classes.searchWrapper}
      role="search"
      relative="path"
      onSubmit={() => {
        setText(searchText);
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
