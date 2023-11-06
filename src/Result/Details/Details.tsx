import { useState, useEffect } from 'react';

import { LoaderFunction, useSearchParams, useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import { MTGModel, getMTGCardsDataDetail } from '../../api/api';

import classes from './Details.module.css';

export const loader: LoaderFunction = async ({ request }): Promise<MTGModel | null> => {
  const url = new URL(request.url);
  const id = url.searchParams.get('details') || '';
  if (!id) {
    return null;
  }
  const searchData = await getMTGCardsDataDetail(id);
  return searchData;
};

const nameFields: Omit<MTGModel, 'colors' | 'name' | 'imageUrl' | 'id'> = {
  manaCost: 'mana cost',
  cmc: 'cmc',
  type: 'type',
  set: 'set',
  setName: 'sets name',
  artist: 'artist',
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

const Details = () => {
  const url = useCurrentUrl();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<MTGModel | null>(null);
  const [searchParams] = useSearchParams();
  const currentId = searchParams.get('details');

  useEffect(() => {
    (async () => {
      if (!currentId) {
        setDetails(null);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        const searchData = await getMTGCardsDataDetail(currentId);
        setDetails(searchData);
        setIsLoading(false);
      }
    })();
  }, [currentId]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && details && (
        <div className={classes.details}>
          <h2 className={classes.heading}>{details.name}</h2>
          <div className={classes.detailsInfo}>
            <div
              className={classes.cardImg}
              style={{ backgroundImage: `url(${details.imageUrl}` }}
              key={`img_${details.id}`}
            ></div>
            <ul className={classes.features}>
              {(Object.keys(nameFields) as Array<keyof typeof nameFields>).map((elem) => {
                return (
                  <li
                    className={classes.infoLine}
                    key={`feature_${details.id}_${nameFields[elem]}`}
                  >
                    <span>{nameFields[elem]}</span>
                    {': '}
                    <span>{details[elem]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            onClick={() => {
              setDetails(null);
              navigate(url);
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Details;
