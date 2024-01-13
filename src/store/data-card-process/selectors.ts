import { NameSpace } from '../../const';
import { TState } from '../../types/type-store';

export const selectCards = (state: TState) => state[NameSpace.DATA_CARDS].cards;
export const selectPromo = (state: TState) => state[NameSpace.DATA_CARDS].promo;
export const selectIsClickBuy = (state: TState) => state[NameSpace.DATA_CARDS].isClickBuy;
export const selectCardId = (state:TState) => state[NameSpace.DATA_CARDS].cardCurrent;
