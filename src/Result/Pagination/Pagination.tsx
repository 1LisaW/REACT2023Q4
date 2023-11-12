import { useOutletContext, useSearchParams } from 'react-router-dom';
import classes from './Pagination.module.css';

type OutletProps = {
  page: number;
  onClick: (value: number) => void;
};

const Pagination = () => {
  const content: OutletProps = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value: number) => {
    content.onClick(value);
    searchParams.set('page', value.toString());
    setSearchParams(searchParams);
  };
  return (
    <div className={classes.paginationWrapper}>
      <button
        disabled={content.page === 1 ? true : false}
        onClick={() => handleClick(content.page - 1)}
      >
        Left
      </button>
      <div>{content.page}</div>
      <button
        disabled={content.page === 10 ? true : false}
        onClick={() => handleClick(content.page + 1)}
      >
        Right
      </button>
    </div>
  );
};

export default Pagination;
