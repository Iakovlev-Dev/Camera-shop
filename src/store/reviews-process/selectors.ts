import { NameSpace } from '../../const';
import { TState } from '../../types/type-store';

export const selectReviews = (state: TState) => state[NameSpace.REVIEW].reviews;
export const selectPostSuccess = (state: TState) => state[NameSpace.REVIEW].isPostSuccess;
