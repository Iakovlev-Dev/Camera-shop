import { NameSpace } from '../../const';
import { TState } from '../../types/type-store';

export const selectActiveSortBy = (state: TState) => state[NameSpace.SORTING].activeSortBy;
export const selectActiveSortBtn = (state: TState) => state[NameSpace.SORTING].activeSortBtn;
