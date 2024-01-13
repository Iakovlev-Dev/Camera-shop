import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCamera, TCameraArray } from '../../types/type-camera';
import { fetchCardsAction, fetchPromoAction } from '../api-action';
import { TPromoArray } from '../../types/type-promo';

export type TinitialStateDataCards = {
    cards: TCameraArray | null;
    promo: TPromoArray | null;
    isClickBuy: boolean;
    cardCurrent: TCamera | null;
}

const initialStateDataCards: TinitialStateDataCards = {
  cards: null,
  promo: null,
  isClickBuy: false,
  cardCurrent: null
};

export const dataCardsProcess = createSlice({
  name: NameSpace.DATA_CARDS,
  initialState: initialStateDataCards,
  reducers: {
    setClickBuy(state, action: PayloadAction<boolean>) {
      state.isClickBuy = action.payload;
    },
    setCardId(state, action: PayloadAction<TCamera>) {
      state.cardCurrent = action.payload;
    }
  },
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

export const {setClickBuy, setCardId} = dataCardsProcess.actions;
