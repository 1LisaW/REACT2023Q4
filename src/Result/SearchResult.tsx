import classes from './SearchResult.module.css';
import {
  useNavigation,
  useSearchParams,
  Outlet,
  useNavigate,
  createSearchParams,
  useParams,
} from 'react-router-dom';
import { MTGModel } from '../api/api';
import Spinner from '../Spinner/Spinner';
import Pagination from './Pagination/Pagination';
import { useTextSelector } from '../app/slices/searchTextSlice';
import { useGetMTGCardsQuery } from '../app/services/api';
import { usePageSelector } from '../app/slices/pageSlice';
import { usePageSizeSelector } from '../app/slices/pageSizeSlice';
import {
  toggleLoadingCards,
  toggleLoadingDetails,
  useLoadingSelector,
} from '../app/slices/loadingSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '../app/store';
import Card from './Card/Card';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const { id: currId } = useParams();
  const navigation = useNavigation();
  const text = useTextSelector();
  const page = usePageSelector();
  const pageSize = usePageSizeSelector();
  const loadings = useLoadingSelector();
  const dispatch = useAppDispatch();
  const { data } = useGetMTGCardsQuery({
    name: text,
    page: String(page),
    pageSize: String(pageSize),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!navigation || !navigation.location) {
      dispatch(toggleLoadingCards(false));
      dispatch(toggleLoadingDetails(false));
      return;
    }
    if (navigation.state === 'loading') {
      if (navigation.location.pathname === '/cards') dispatch(toggleLoadingCards(true));
      else dispatch(toggleLoadingDetails(true));
    } else if (
      navigation.location &&
      navigation.location.pathname === '/cards' &&
      loadings.loadingCards
    )
      dispatch(toggleLoadingCards(false));
    else if (
      navigation.location &&
      navigation.location.pathname !== '/cards' &&
      loadings.loadingDetails
    )
      dispatch(toggleLoadingDetails(false));
  }, [navigation.state, navigation.location]);

  const goToDetails = (id: string) => {
    const searchParamsText = `?${createSearchParams({
      name: text,
      page: searchParams.get('page') || '1',
      pageSize: searchParams.get('pageSize') || '3',
    })}`;
    if (currId !== id) {
      navigate(
        {
          pathname: `details/${id}`,
          search: searchParamsText,
        },
        { replace: false },
      );
    } else {
      navigate(`../..${searchParamsText}`, { relative: 'path' });
    }
  };

  return (
    <>
      <div className={classes.main} data-testid="cards">
        <div className={classes.list}>
          {loadings.loadingCards ? (
            <Spinner />
          ) : data && data.cards && data.cards.length > 0 ? (
            data.cards.map((item: MTGModel) => {
              return (
                <a
                  onClick={() => {
                    goToDetails(item.id);
                  }}
                  key={item.id}
                  data-testid="card"
                >
                  <Card {...item} />
                </a>
              );
            })
          ) : (
            <div className={classes.noData} data-testid="noData">
              No cards found
            </div>
          )}
        </div>
        <div className={classes.details}>
          {loadings.loadingDetails ? <Spinner /> : <Outlet></Outlet>}
        </div>
      </div>
      {(navigation.state !== 'loading' || navigation.location.pathname !== '/cards') &&
        data &&
        data.cards &&
        data.cards.length > 0 && <Pagination />}
    </>
  );
};

export default SearchResult;
