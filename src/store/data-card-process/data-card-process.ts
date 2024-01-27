import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCamera, TCameraArray } from '../../types/type-camera';
import { fetchCardAction, fetchCardsAction, fetchSimilarProductsAction } from '../api-action';
import { TPromoArray } from '../../types/type-promo';
import { TSimilarProductArray } from '../../types/type-similar-product';

export type TinitialStateDataCards = {
    cards: TCameraArray;
    promo: TPromoArray;
    cardCurrent: TCamera | null;
    similarProducts: TSimilarProductArray;
    isLoadingData: boolean;
    isLoadibgDataRejected: boolean;
}

const initialState: TinitialStateDataCards = {
  cards: [],
  promo: [],
  cardCurrent: null,
  similarProducts: [],
  isLoadingData: false,
  isLoadibgDataRejected: false
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
        state.isLoadingData = false;
      })
      .addCase(fetchCardsAction.rejected, (state) => {
        state.isLoadingData = false;
        state.isLoadibgDataRejected = true;
      })
      .addCase(fetchCardsAction.pending, (state) => {
        state.isLoadingData = true;
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
