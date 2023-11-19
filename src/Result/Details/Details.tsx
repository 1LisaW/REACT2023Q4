import {
  LoaderFunction,
  useSearchParams,
  useNavigate,
  createSearchParams,
  useParams,
} from 'react-router-dom';
import { MTGModel } from '../../api/api';

import classes from './Details.module.css';
import { cardMTGsApi, useGetMTGCardQuery } from '../../app/services/api';
import { store } from '../../app/store';

export const loader: LoaderFunction = async ({
  params,
}): Promise<Record<'card', MTGModel> | null> => {
  const id = params.id;
  if (id) {
    await store.dispatch(cardMTGsApi.endpoints.getMTGCard.initiate({ id }));
  }
  return null;
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
  const { id: currId } = useParams();
  const { data } = useGetMTGCardQuery({ id: currId || '' });
  const [searchParams] = useSearchParams();

  return (
    <>
      {data?.card && (
        <div className={classes.details} data-testid="details">
          <h2 className={classes.heading} data-testid={'details_name'}>
            {data.card.name}
          </h2>
          <div className={classes.detailsInfo}>
            <div
              className={classes.cardImg}
              style={{ backgroundImage: `url(${data.card.imageUrl}` }}
              key={`img_${data.card.id}`}
            ></div>
            <ul className={classes.features}>
              {(Object.keys(nameFields) as Array<keyof typeof nameFields>).map((elem) => {
                return (
                  <li
                    className={classes.infoLine}
                    key={`feature_${data.card.id}_${nameFields[elem]}`}
                  >
                    <span>{nameFields[elem]}</span>
                    {': '}
                    <span data-testid={`details_${elem}`}>{data.card[elem]}</span>
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
