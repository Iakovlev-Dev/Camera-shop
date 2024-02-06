import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TReviews, TReviewsArray } from '../../types/type-reviews';
import { NameSpace } from '../../const';
import { fetchReviewsAction, postReviewAction } from '../api-action';

export type TReviewsProcess = {
    reviews: TReviewsArray | [] | TReviews[];
    isPostSuccess: boolean;
}

const initialState: TReviewsProcess = {
  reviews: [],
  isPostSuccess: false,
};

export const reviewProcess = createSlice({
  name: NameSpace.REVIEW,
  initialState,
  reducers: {
    setPostSuccess: (state, action: PayloadAction<boolean>) => {
      state.isPostSuccess = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.isPostSuccess = true;
        state.reviews = [...state.reviews, action.payload];
      });
  },
});

export const { setPostSuccess} = reviewProcess.actions;
