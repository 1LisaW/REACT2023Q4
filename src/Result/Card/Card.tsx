import { MTGModel } from '../../api/api';
import classes from './Card.module.css';

const nameFields: Omit<MTGModel,'colors' | 'name' | 'imageUrl' | 'id' | 'set' | 'setName' | 'artist' | 'cmc'> = {
  manaCost: 'mana cost',
  type: 'type',
};

const Card = (props: MTGModel) => {
  return (
    <section className={classes.card} key={`section_${props.id}`}>
      <div
        className={classes.cardImg}
        style={{ backgroundImage: `url(${props.imageUrl}`}}
        key={`img_${props.id}`}
      ></div>
      <div className={classes.cardContent} key={`content_${props.id}`}>
        <h2 className={classes.heading}>{props.name}</h2>
        <ul className={classes.features}>
          {(Object.keys(nameFields) as Array<keyof typeof nameFields>).map((elem) => {
            return (
              <li
                className={classes.infoLine}
                key={`feature_${props.id}_${nameFields[elem]}`}
              >
                <span>{nameFields[elem]}</span>
                {': '}
                <span>{props[elem]}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Card;
