import { NameSpace } from '../../const';
import { TState } from '../../types/type-store';

export const selectReviews = (state: TState) => state[NameSpace.REVIEW].reviews;
