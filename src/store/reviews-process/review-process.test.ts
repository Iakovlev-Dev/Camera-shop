import { makeFakeReview } from '../../mocks/mocks';
import { fetchReviewsAction } from '../api-action';
import { reviewProcess, setPostSuccess } from './review-process';

describe('ReviewProcess', () => {
  it('should return initialState with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: [],
      isPostSuccess: false,
    };

    const result = reviewProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initialState with empty action and undefind State', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: [],
      isPostSuccess: false,
    };
    const result = reviewProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "isPostSuccess" to true with setPostSuccess action', () => {
    const initialSate = {
      reviews: [],
      isPostSuccess: false,
    };
    const result = reviewProcess.reducer(initialSate, setPostSuccess(true));
    expect(result.isPostSuccess).toBe(true);
  });
  it('should set "reviews" to array with review', () => {
    const mockReview = makeFakeReview();
    const expectedState = {
      reviews: [mockReview],
      isPostSuccess: false,
    };
    const result = reviewProcess.reducer(undefined,
      fetchReviewsAction.fulfilled(
        [mockReview], '', mockReview.cameraId
      )
    );
    expect(result).toEqual(expectedState);
  });
});
