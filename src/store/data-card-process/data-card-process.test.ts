import { makeFakeCamera } from '../../mocks/mocks';
import { fetchCardAction, fetchCardsAction, fetchSimilarProductsAction } from '../api-action';
import { dataCardsProcess, setCardId } from './data-card-process';

describe('DataCardProcess', () => {
  it('should return initialSate with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      cards: [],
      cardCurrent: null,
      similarProducts: [],
      isLoadingData: false,
      isLoadibgDataRejected: false
    };

    const result = dataCardsProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initialState with empty action and undefind state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      cards: [],
      cardCurrent: null,
      similarProducts: [],
      isLoadingData: false,
      isLoadibgDataRejected: false
    };
    const result = dataCardsProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "cardCurrent" with setCardId action', () => {
    const card = makeFakeCamera();
    const initialSate = {
      cards: [],
      cardCurrent: card,
      similarProducts: [],
      isLoadingData: false,
      isLoadibgDataRejected: false
    };
    const result = dataCardsProcess.reducer(initialSate, setCardId(card));
    expect(result.cardCurrent).toEqual(card);
  });
  it('should set "cards" to array with cards, "isLoadingData" to false with "fetchCardsAction.fulfilled"', () => {
    const mockCard = makeFakeCamera();
    const expectedState = {
      cards: [mockCard],
      cardCurrent: null,
      similarProducts: [],
      isLoadingData: false,
      isLoadibgDataRejected: false
    };
    const result = dataCardsProcess.reducer(
      undefined,
      fetchCardsAction.fulfilled(
        [mockCard], '', undefined));
    expect(result).toEqual(expectedState);
  });
  it('should set "isLoadingData" to false, "isLoadibgDataRejected" to true with "fetchCardsAction.rejected"', () => {
    const expectedState = {
      cards: [],
      cardCurrent: null,
      similarProducts: [],
      isLoadingData: false,
      isLoadibgDataRejected: true
    };

    const result = dataCardsProcess.reducer(
      undefined,
      fetchCardsAction.rejected
    );
    expect(result).toEqual(expectedState);
  });
  it('should set "isLoadingData" to true with "fetchCardsAction.pending"', () => {
    const expectedState = {
      cards: [],
      cardCurrent: null,
      similarProducts: [],
      isLoadingData: true,
      isLoadibgDataRejected: false
    };
    const result = dataCardsProcess.reducer(undefined,
      fetchCardsAction.pending);
    expect(result).toEqual(expectedState);
  });
  it('should set "cardCurrent" to true with "fetchCardAction.fulfilled"', () => {
    const mockCard = makeFakeCamera();
    const expectedState = {
      cards: [],
      cardCurrent: mockCard,
      similarProducts: [],
      isLoadingData: false,
      isLoadibgDataRejected: false
    };
    const result = dataCardsProcess.reducer(undefined,
      fetchCardAction.fulfilled(
        mockCard, '', mockCard.id
      ));
    expect(result).toEqual(expectedState);
  });
  it('should set "similarProducts" to true with "fetchSimilarProductsAction.fulfilled"', () => {
    const mockCard = makeFakeCamera();
    const expectedState = {
      cards: [],
      cardCurrent: null,
      similarProducts: [mockCard],
      isLoadingData: false,
      isLoadibgDataRejected: false
    };
    const result = dataCardsProcess.reducer(undefined,
      fetchSimilarProductsAction.fulfilled(
        [mockCard], '', mockCard.id
      ));
    expect(result).toEqual(expectedState);
  });
});
