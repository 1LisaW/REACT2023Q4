import { ChangeEvent } from 'react';
import classes from './Search.module.css';

type SearchProps = {
  searchText: string;
  onChange: (value: string) => void;
  onSubmit: (searchText: string) => void;
  onError: () => void;
};

const Search = (props: SearchProps) => {
  const { searchText, onChange, onError, onSubmit } = props;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClick = () => {
    onSubmit(searchText);
  };
  const handleClickErr = () => {
    onError();
  };
  return (
    <div className={classes.searchWrapper}>
      <input
        className={classes.inputSearch}
        value={searchText}
        onChange={handleChange}
      ></input>
      <button className={classes.buttonSearch} onClick={handleClick}>
        Search
      </button>
      <button className={classes.buttonSearch} onClick={handleClickErr}>
        Error
      </button>
    </div>
  );
}

export default Search;
