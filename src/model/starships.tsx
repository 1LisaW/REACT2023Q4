import { StarshipDTO } from '../api/starships';

export type StarshipModel = Omit<StarshipDTO, 'url'> & { img: string };
