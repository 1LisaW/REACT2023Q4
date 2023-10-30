import { StarshipModel } from '../../model/starships';
import { MOCK_IMG } from '../../api/api';
import classes from './Card.module.css';

const nameFields: Omit<StarshipModel, 'img' | 'pilots' | 'films' | 'name'> = {
  model: 'Model',
  MGLT: 'MGLT',
  cargo_capacity: 'cargo capacity',
  consumables: 'consumables',
  cost_in_credits: 'cost in credits',
  created: 'created',
  crew: 'crew',
  edited: 'edited',
  hyperdrive_rating: 'hyperdrive rating',
  starship_class: 'starship_class',
  length: 'length',
  manufacturer: 'manufacturer',
  passengers: 'passengers',
  max_atmosphering_speed: 'max atmosphering speed',
};

const Card = (props: StarshipModel) => {
    return (
      <section className={classes.card} key={`section_${props.name}`}>
        <div
          className={classes.cardImg}
          style={{ backgroundImage: `url(${props.img}), url(${MOCK_IMG})` }}
          key={`img_${props.name}`}
        ></div>
        <div className={classes.cardContent} key={`content_${props.name}`}>
          <h2 className={classes.heading}>{props.name}</h2>
          <ul className={classes.features}>
            {(Object.keys(nameFields) as Array<keyof typeof nameFields>).map(
              (elem) => {
                return (
                  <li
                    className={classes.infoLine}
                    key={`feature_${props.name}_${nameFields[elem]}`}
                  >
                    <span>{nameFields[elem]}</span>
                    {': '}
                    <span>{props[elem]}</span>
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </section>
  );
}

export default Card;
