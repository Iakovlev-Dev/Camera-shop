import { LoadingDataStatus, NameSpace } from '../../const';
import { makeFakeReview, makeFakeStore } from '../../mocks/mocks';
import { selectPostSuccess, selectReviews, selectSendingStatus } from './selectors';

describe('SelectorReviews', () => {
  const review = makeFakeReview();
  const state = makeFakeStore({
    [NameSpace.REVIEW]: {
      reviews: [review],
      reviewSendingStatus: LoadingDataStatus.Unsent,
      isPostSuccess: false,
    }
  });
  it('Should return reviews from state', () => {
    const {reviews} = state[NameSpace.REVIEW];
    const result = selectReviews(state);
    expect(result).toEqual(reviews);
  });
  it('Should return reviewSendingStatus from state', () => {
    const {reviewSendingStatus} = state[NameSpace.REVIEW];
    const result = selectSendingStatus(state);
    expect(result).toEqual(reviewSendingStatus);
  });
  it('Should return isPostSuccess from state', () => {
    const {isPostSuccess} = state[NameSpace.REVIEW];
    const result = selectPostSuccess(state);
    expect(result).toEqual(isPostSuccess);
  });
});
