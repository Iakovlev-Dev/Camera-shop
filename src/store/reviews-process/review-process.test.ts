import { LoadingDataStatus } from '../../const';
import { makeFakeReview, makeFakeReviewPostRequest, makeFakeReviewPostResponse } from '../../mocks/mocks';
import { fetchReviewsAction, postReviewAction } from '../api-action';
import { reviewProcess, setPostSuccess, setSendingStatus } from './review-process';

describe('ReviewProcess', () => {
  it('should return initialState with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: [],
      reviewSendingStatus: LoadingDataStatus.Unsent,
      isPostSuccess: false,
    };

    const result = reviewProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initialState with empty action and undefind State', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: [],
      reviewSendingStatus: LoadingDataStatus.Unsent,
      isPostSuccess: false,
    };

    const result = reviewProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "reviewSendingStatus" to  with setSendingStatus action', () => {
    const expectedStatus = LoadingDataStatus.Success;
    const initialState = {
      reviews: [],
      reviewSendingStatus: LoadingDataStatus.Unsent,
      isPostSuccess: false,
    };

    const result = reviewProcess.reducer(
      initialState, setSendingStatus(expectedStatus)
    );
    expect(result.reviewSendingStatus).toBe(expectedStatus);
  });
  it('should set "isPostSuccess" to true with setPostSuccess action', () => {
    const initialSate = {
      reviews: [],
      reviewSendingStatus: LoadingDataStatus.Unsent,
      isPostSuccess: false,
    };
    const result = reviewProcess.reducer(initialSate, setPostSuccess(true));
    expect(result.isPostSuccess).toBe(true);
  });
  it('should set "reviews" to array with review', () => {
    const mockReview = makeFakeReview();
    const expectedState = {
      reviews: [mockReview],
      reviewSendingStatus: LoadingDataStatus.Unsent,
      isPostSuccess: false,
    };

    const result = reviewProcess.reducer(undefined,
      fetchReviewsAction.fulfilled(
        [mockReview], '', mockReview.cameraId
      )
    );
    expect(result).toEqual(expectedState);
  });
  it('should set "reviewSendingStatus" to Success, "isPostSuccess" to true with postReviewAction.fulfilled', () => {
    const expectedState = {
      reviews: [],
      reviewSendingStatus: LoadingDataStatus.Success,
      isPostSuccess: true,
    };
    const mockReviewPost = makeFakeReviewPostResponse();
    const mockReviewPostRequest = makeFakeReviewPostRequest();
    const result = reviewProcess.reducer(undefined,
      postReviewAction.fulfilled(
        mockReviewPost, '', mockReviewPostRequest
      ));
    expect(result).toEqual(expectedState);
  });
  it('should set "reviewSendingStatus" to Pending with postReviewAction.pending', () => {
    const expectedStatus = LoadingDataStatus.Pending;

    const result = reviewProcess.reducer(undefined,
      postReviewAction.pending);
    expect(result.reviewSendingStatus).toEqual(expectedStatus);
  });
});
