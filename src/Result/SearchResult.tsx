import classes from './SearchResult.module.css';
import Card from './Card/Card';
import {
  LoaderFunction,
  useLoaderData,
  useNavigation,
  useOutletContext,
  Link,
  useSearchParams,
  Outlet,
} from 'react-router-dom';
import { MTGModel, getMTGCardsData } from '../api/api';
import Spinner from '../Spinner/Spinner';

export const loader: LoaderFunction = async ({
  request,
}): Promise<MTGModel[] | never[]> => {
  const url = new URL(request.url);
  const search = url.searchParams.get('name') || '';
  const pageSize = url.searchParams.get('pageSize') || '';
  const page = url.searchParams.get('page') || '';
  const searchData = await getMTGCardsData({
    name: search,
    pageSize: Number(pageSize) || 3,
    page: Number(page) || 1,
  });
  return searchData;
};

type OutletProps = {
  page: number;
  onClick: (value: number) => void;
};

const useCurrentUrl = () => {
  const [searchParams] = useSearchParams();

  return (
    '?' +
    ['pageSize', 'page', 'name']
      .map((key) => `${key}=${searchParams.get(key) || ''}`)
      .join('&')
  );
};

const SearchResult = () => {
  const url = useCurrentUrl();
  const [searchParams] = useSearchParams();
  const currentId = searchParams.get('details');

  const content: OutletProps = useOutletContext();
  const searchData = useLoaderData() as MTGModel[] | never[];
  const { state } = useNavigation();
  const handleClick = (value: number) => {
    content.onClick(value);
  };
  return (
    <>
      <div className={classes.main}>
        <div className={classes.list}>
          {state === 'loading' ? (
            <Spinner />
          ) : (
            searchData &&
            searchData.map((item: MTGModel) => {
              return (
                <Link
                  to={currentId === item.id ? url : `${url}&details=${item.id}`}
                  key={item.id}
                >
                  <Card {...item} />
                </Link>
              );
            })
          )}
        </div>
        <div className={classes.details}>
          <Outlet></Outlet>
        </div>
      </div>
      {state !== 'loading' && (
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
      )}
    </>
  );
};

export default SearchResult;
