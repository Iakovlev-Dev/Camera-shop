import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TReviewsArray } from '../../types/type-reviews';
import { LoadingDataStatus, NameSpace } from '../../const';
import { fetchReviewsAction, postReviewAction } from '../api-action';

export type TReviewsProcess = {
    reviews: TReviewsArray | [];
    reviewSendingStatus: string;
    isPostSuccess: boolean;
}

const initialState: TReviewsProcess = {
  reviews: [],
  reviewSendingStatus: LoadingDataStatus.Unsent,
  isPostSuccess: false,
};

export const reviewProcess = createSlice({
  name: NameSpace.REVIEW,
  initialState,
  reducers: {
    setSendingStatus: (state, action: PayloadAction<string>) => {
      state.reviewSendingStatus = action.payload;
    },
    setPostSuccess: (state, action: PayloadAction<boolean>) => {
      state.isPostSuccess = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.reviewSendingStatus = LoadingDataStatus.Success;
        state.isPostSuccess = true;
        document.body.classList.add('scroll-lock');
      })
      .addCase(postReviewAction.pending, (state) => {
        state.reviewSendingStatus = LoadingDataStatus.Pending;
      });
  },
});

export const {setSendingStatus, setPostSuccess} = reviewProcess.actions;
