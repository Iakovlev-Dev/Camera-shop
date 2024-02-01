import { makeFakePromo } from '../../mocks/mocks';
import { fetchPromoAction } from '../api-action';
import { promoProcess } from './promo-process';

describe('PromoProcess Slice', () => {
  it('should return initialState with empty action', () => {
    const emptyAction = {type: ''};
    const promo = makeFakePromo();
    const expectedState = {
      promo: [promo]
    };
    const result = promoProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initialState with empty action and undefind state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      promo: null
    };

    const result = promoProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "promo" to array with promo', () => {
    const promo = makeFakePromo();
    const expectedState = {
      promo: [promo]
    };
    const result = promoProcess.reducer(
      undefined,
      fetchPromoAction.fulfilled(
        [promo], '', undefined
      )
    );
    expect(result).toEqual(expectedState);
  });
});
