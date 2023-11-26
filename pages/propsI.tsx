import { MTGModel } from '../app/api/api';
import { LoadingState } from '../app/slices/loadingSlice';

export default interface PropsI {
  name: string;
  page: string;
  pageSize: string;
  loadings: LoadingState;
  cards: { cards: MTGModel[] | never[] };
  details?: { card: MTGModel | never };
}
