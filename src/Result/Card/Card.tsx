import { Component } from 'react';
import { StarshipModel } from '../../model/starships';
import { MOCK_IMG } from '../../api/api';
import classes from './Card.module.css';

class Card extends Component<StarshipModel> {
  nameFields: Omit<StarshipModel, 'img' | 'pilots' | 'films' | 'name'> = {
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
  constructor(props: StarshipModel) {
    super(props);
  }

  render() {
    return (
      <section className={classes.card} key={`section_${this.props.name}`}>
        <div
          className={classes.cardImg}
          style={{ backgroundImage: `url(${this.props.img}), url(${MOCK_IMG})` }}
          key={`img_${this.props.name}`}
        ></div>
        <div className={classes.cardContent} key={`content_${this.props.name}`}>
          <h2 className={classes.heading}>{this.props.name}</h2>
          <ul className={classes.features}>
            {(Object.keys(this.nameFields) as Array<keyof typeof this.nameFields>).map(
              (elem) => {
                return (
                  <li
                    className={classes.infoLine}
                    key={`feature_${this.props.name}_${this.nameFields[elem]}`}
                  >
                    <span>{this.nameFields[elem]}</span>
                    {': '}
                    <span>{this.props[elem]}</span>
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </section>
    );
  }
}

export default Card;
