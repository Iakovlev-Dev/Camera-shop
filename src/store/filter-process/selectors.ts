import { NameSpace } from '../../const';
import { TState } from '../../types/type-store';

export const selectFilterCategory = (state: TState) => state[NameSpace.FILTERS].filterCategory;
export const selectFilterType = (state: TState) => state[NameSpace.FILTERS].filterType;
export const selectFilterLevel = (state: TState) => state[NameSpace.FILTERS].filterLevel;
