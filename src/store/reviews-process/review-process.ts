import { createSlice } from '@reduxjs/toolkit';
import { TReviewsArray } from '../../types/type-reviews';
import { NameSpace } from '../../const';
import { fetchReviewsAction } from '../api-action';

export type TReviewsProcess = {
    reviews: TReviewsArray | [];
}

const initialState: TReviewsProcess = {
  reviews: []
};

export const reviewProcess = createSlice({
  name: NameSpace.REVIEW,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});
