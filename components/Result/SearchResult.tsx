import classes from './SearchResult.module.css';
import Spinner from '../Spinner/Spinner';
// import Pagination from './Pagination/Pagination';
import Card from './Card/Card';
import PropsI from '../../pages/propsI';
import React from 'react';
import { MTGModel } from '../../app/api/api';
import { useLoadingSelector } from '../../app/slices/loadingSlice';

const SearchResult = ({ data }: { data: PropsI }) => {
  const cards = data.cards;
  const loadings = useLoadingSelector();

  return (
    <>
      <div className={classes.main} data-testid="cards">
        <div className={classes.list}>
          {loadings.loadingCards ? (
            <Spinner />
          ) : cards && cards.cards && cards.cards.length > 0 ? (
            cards.cards.map((item: MTGModel) => {
              return <Card key={item.id} {...item} />;
            })
          ) : (
            <div className={classes.noData} data-testid="noData">
              No cards found
            </div>
          )}
        </div>
        <div className={classes.details}>
          {/* {loadings.loadingDetails ? <Spinner /> : <Outlet></Outlet>} */}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
