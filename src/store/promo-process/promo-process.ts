import { createSlice } from '@reduxjs/toolkit';
import { TPromoArray } from '../../types/type-promo';
import { NameSpace } from '../../const';
import { fetchPromoAction } from '../api-action';

export type TPromoProcess = {
    promo: TPromoArray | null;
}

const initialState: TPromoProcess = {
  promo: null
};

export const promoProcess = createSlice({
  name: NameSpace.PROMO,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  },
});
