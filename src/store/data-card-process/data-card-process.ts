import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCameraArray } from '../../types/type-camera';
import { fetchCardsAction } from '../api-action';

export type TinitialStateDataCards = {
    cards: TCameraArray | null;
}

const initialStateDataCards: TinitialStateDataCards = {
  cards: null
};

export const dataCardsProcess = createSlice({
  name: NameSpace.DATA_CARDS,
  initialState: initialStateDataCards,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCardsAction.fulfilled, (state, action) => {
        state.cards = action.payload;
      });
  },
});
