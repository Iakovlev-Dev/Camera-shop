import { NameSpace } from '../../const';
import { TState } from '../../types/type-store';

export const selectPromo = (state: TState) => state[NameSpace.PROMO].promo;
