import React from 'react';
import classes from './Card.module.css';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { MTGModel } from '../../../app/api/api';
import { useAppDispatch } from '../../../app/store';
import { toggleLoadingDetails } from '../../../app/slices/loadingSlice';

const nameFields: Omit<
  MTGModel,
  'colors' | 'name' | 'imageUrl' | 'id' | 'set' | 'setName' | 'artist' | 'cmc'
> = {
  manaCost: 'mana cost',
  type: 'type',
};

const Card = (props: MTGModel) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ...rest } = router.query as Record<string, string>;
  const goToDetails = async (event) => {
    event.preventDefault();
    if (router.pathname === '/cards') {
      await dispatch(toggleLoadingDetails(true));
      await router.push({ pathname: `/cards/detail/${props.id}`, query: rest });
      dispatch(toggleLoadingDetails(false));
    } else if (rest.id === props.id)
      await router.push({ pathname: `/cards`, query: rest });
    else {
      await dispatch(toggleLoadingDetails(true));
      await router.push({ pathname: `/cards/detail/${props.id}`, query: rest }, {});
      dispatch(toggleLoadingDetails(false));
    }
  };
  return (
    <section className={classes.card} key={`section_${props.id}`}>
      <a onClick={goToDetails} data-testid="card">
        <div
          className={classes.cardImg}
          style={props.imageUrl ? { backgroundImage: `url(${props.imageUrl}` } : {}}
          key={`img_${props.id}`}
        ></div>
        <div className={classes.cardContent} key={`content_${props.id}`}>
          <h2 className={classes.heading} data-testid="name">
            {props.name}
          </h2>
          <ul className={classes.features}>
            {(Object.keys(nameFields) as Array<keyof typeof nameFields>).map((elem) => {
              return (
                <li
                  className={classes.infoLine}
                  key={`feature_${props.id}_${nameFields[elem]}`}
                >
                  <span>{nameFields[elem]}</span>
                  {': '}
                  <span data-testid={`${elem}`}>{props[elem]}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </a>
    </section>
  );
};

export default Card;
