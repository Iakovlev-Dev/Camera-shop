import { NameSpace } from '../../const';
import { makeFakeReview, makeFakeStore } from '../../mocks/mocks';
import { selectPostSuccess, selectReviews } from './selectors';

describe('SelectorReviews', () => {
  const review = makeFakeReview();
  const state = makeFakeStore({
    [NameSpace.REVIEW]: {
      reviews: [review],
      isPostSuccess: false,
    }
  });
  it('Should return reviews from state', () => {
    const {reviews} = state[NameSpace.REVIEW];
    const result = selectReviews(state);
    expect(result).toEqual(reviews);
  });
  it('Should return isPostSuccess from state', () => {
    const {isPostSuccess} = state[NameSpace.REVIEW];
    const result = selectPostSuccess(state);
    expect(result).toEqual(isPostSuccess);
  });
});
