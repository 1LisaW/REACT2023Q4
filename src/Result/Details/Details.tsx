import {
  LoaderFunction,
  useSearchParams,
  useNavigate,
  useLoaderData,
  createSearchParams,
} from 'react-router-dom';
import { MTGModel, getMTGCardsDataDetail } from '../../api/api';

import classes from './Details.module.css';

export const loader: LoaderFunction = async ({ params }): Promise<MTGModel | null> => {
  const id = params.id;
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

const Details = () => {
  const navigate = useNavigate();
  const details = useLoaderData() as MTGModel | null;
  const [searchParams] = useSearchParams();

  return (
    <>
      {details && (
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
              const searchParamsText = `?${createSearchParams({
                name: searchParams.get('name') || '',
                page: searchParams.get('page') || '1',
                pageSize: searchParams.get('pageSize') || '3',
              })}`;
              navigate(`../..${searchParamsText}`, { relative: 'path' });
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
