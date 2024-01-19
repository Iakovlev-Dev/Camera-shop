import { NameSpace } from '../../const';
import { TState } from '../../types/type-store';


export const selectCards = (state: TState) => state[NameSpace.DATA_CARDS].cards;
export const selectCardId = (state:TState) => state[NameSpace.DATA_CARDS].cardCurrent;
export const selectSimilarProducts = (state: TState) => state[NameSpace.DATA_CARDS].similarProducts;
