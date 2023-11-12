import classes from './SearchResult.module.css';
import Card from './Card/Card';
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
import { useStateStore } from '../StateContext/SearchContext';
import Pagination from './Pagination/Pagination';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const { id: currId } = useParams();
  const navigation = useNavigation();
  const { text, result } = useStateStore();
  const navigate = useNavigate();

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
          {navigation.state == 'loading' && navigation.location.pathname == '/cards' ? (
            <Spinner />
          ) : result && result.length > 0 ? (
            result.map((item: MTGModel) => {
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
          {navigation.state == 'loading' && navigation.location.pathname !== '/cards' ? (
            <Spinner />
          ) : (
            <Outlet></Outlet>
          )}
        </div>
      </div>
      {(navigation.state !== 'loading' || navigation.location.pathname !== '/cards') &&
        result.length > 0 && <Pagination />}
    </>
  );
};

export default SearchResult;
