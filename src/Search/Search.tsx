import { ChangeEvent, Component } from 'react';
import classes from './Search.module.css';

type SearchProps = {
  searchText: string;
  onChange: (value: string) => void;
  onSubmit: (searchText: string) => void;
  onError: () => void;
};

class Search extends Component<SearchProps> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  handleClick = () => {
    this.props.onSubmit(this.props.searchText);
  };
  handleClickErr = () => {
    this.props.onError();
  };
  render() {
    const { searchText } = this.props;
    return (
      <div className={classes.searchWrapper}>
        <input
          className={classes.inputSearch}
          value={searchText}
          onChange={this.handleChange}
        ></input>
        <button className={classes.buttonSearch} onClick={this.handleClick}>
          Search
        </button>
        <button className={classes.buttonSearch} onClick={this.handleClickErr}>
          Error
        </button>
      </div>
    );
  }
}

export default Search;
