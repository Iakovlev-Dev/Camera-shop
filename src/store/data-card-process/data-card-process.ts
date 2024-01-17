import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCamera, TCameraArray } from '../../types/type-camera';
import { fetchCardAction, fetchCardsAction, fetchPromoAction, fetchSimilarProductsAction } from '../api-action';
import { TPromoArray } from '../../types/type-promo';
import { TSimilarProductArray } from '../../types/type-similar-product';

export type TinitialStateDataCards = {
    cards: TCameraArray;
    promo: TPromoArray;
    cardCurrent: TCamera | null;
    similarProducts: TSimilarProductArray;
}

const initialState: TinitialStateDataCards = {
  cards: [],
  promo: [],
  cardCurrent: null,
  similarProducts: []
};

export const dataCardsProcess = createSlice({
  name: NameSpace.DATA_CARDS,
  initialState,
  reducers: {
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
      })
      .addCase(fetchCardAction.fulfilled, (state, action) => {
        state.cardCurrent = action.payload;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      });
  },
});

export const { setCardId } = dataCardsProcess.actions;
