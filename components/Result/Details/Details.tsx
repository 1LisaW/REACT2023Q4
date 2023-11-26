import classes from './Details.module.css';
import PropsI from '../../../pages/propsI';
import React from 'react';
import { MTGModel } from '../../../app/api/api';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../app/store';
import { toggleLoadingDetails } from '../../../app/slices/loadingSlice';

const nameFields: Omit<MTGModel, 'colors' | 'name' | 'imageUrl' | 'id'> = {
  manaCost: 'mana cost',
  cmc: 'cmc',
  type: 'type',
  set: 'set',
  setName: 'sets name',
  artist: 'artist',
};

const Details = ({ data }: { data: PropsI }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { details } = data;
  const card = details?.card;

  return (
    <>
      {card && (
        <div className={classes.details} data-testid="details">
          <h2 className={classes.heading} data-testid={'details_name'}>
            {card.name}
          </h2>
          <div className={classes.detailsInfo}>
            <div
              className={classes.cardImg}
              style={{ backgroundImage: `url(${card.imageUrl}` }}
              key={`img_${card.id}`}
            ></div>
            <ul className={classes.features}>
              {(Object.keys(nameFields) as Array<keyof typeof nameFields>).map((elem) => {
                return (
                  <li
                    className={classes.infoLine}
                    key={`feature_${card.id}_${nameFields[elem]}`}
                  >
                    <span>{nameFields[elem]}</span>
                    {': '}
                    <span data-testid={`details_${String(elem)}`}>{card[elem]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            onClick={() => {
              dispatch(toggleLoadingDetails(true));
              router.back();
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
