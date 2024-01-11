import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCameraArray } from '../../types/type-camera';
import { fetchCardsAction, fetchPromoAction } from '../api-action';
import { TPromoArray } from '../../types/type-promo';

export type TinitialStateDataCards = {
    cards: TCameraArray | null;
    promo: TPromoArray | null;
}

const initialStateDataCards: TinitialStateDataCards = {
  cards: null,
  promo: null
};

export const dataCardsProcess = createSlice({
  name: NameSpace.DATA_CARDS,
  initialState: initialStateDataCards,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCardsAction.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  },
});
