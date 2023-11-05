import classes from './Search.module.css';
import { Form, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  return (
    <Form className={classes.searchWrapper} role="search" relative="path">
      <input type="hidden" name="pageSize" value={searchParams.get('pageSize') || ''} />
      <input type="hidden" name="page" value={searchParams.get('page') || '1'} />
      <input
        className={classes.inputSearch}
        aria-label="search"
        placeholder="Search"
        type="search"
        name="name"
        defaultValue={searchParams.get('name') || ''}
      ></input>
      <button className={classes.buttonSearch}>Search</button>
      <button className={classes.buttonSearch}>Error</button>
    </Form>
  );
};

export default Search;
