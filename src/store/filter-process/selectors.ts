import { NameSpace } from '../../const';
import { TState } from '../../types/type-store';

export const selectFilterCategory = (state: TState) => state[NameSpace.FILTERS].filterCategory;

