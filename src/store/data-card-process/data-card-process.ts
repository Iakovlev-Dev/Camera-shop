import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCamera } from '../../types/type-camera';
import { fetchCamerasByPriceAction, fetchCardAction, fetchCardsAction, fetchSimilarProductsAction } from '../api-action';
import { TSimilarProductArray } from '../../types/type-similar-product';

export type TinitialStateDataCards = {
    cards: TCamera [];
    filtredCards: TCamera[];
    cardCurrent: TCamera | null;
    similarProducts: TSimilarProductArray;
    isLoadingData: boolean;
    isLoadibgDataRejected: boolean;
    currentPage: number;
}

const initialState: TinitialStateDataCards = {
  cards: [],
  filtredCards: [],
  cardCurrent: null,
  similarProducts: [],
  isLoadingData: false,
  isLoadibgDataRejected: false,
  currentPage: 1,
};

export const dataCardsProcess = createSlice({
  name: NameSpace.DATA_CARDS,
  initialState,
  reducers: {
    setCardId(state, action: PayloadAction<TCamera>) {
      state.cardCurrent = action.payload;
    },
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
      })
      .addCase(fetchCamerasByPriceAction.pending, (state) => {
        state.isLoadingData = true;
      })
      .addCase(fetchCamerasByPriceAction.fulfilled, (state) => {
        state.isLoadingData = false;
      });
  },
});

export const { setCardId } = dataCardsProcess.actions;
