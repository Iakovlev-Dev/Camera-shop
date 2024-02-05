import { NameSpace } from '../../const';
import { makeFakeCamera, makeFakeStore } from '../../mocks/mocks';
import { selectCardId, selectCards, selectLoadingStatus, selectLoadingStatusRejected, selectSimilarProducts } from './selectors';

describe('SelectorsDataCards', () => {
  const mockCard = makeFakeCamera();
  const state = makeFakeStore({
    [NameSpace.DATA_CARDS]: {
      cards: [mockCard],
      cardCurrent: mockCard,
      similarProducts: [mockCard],
      isLoadingData: true,
      isLoadibgDataRejected: false
    }
  });

  it('Should return cards from state', () => {
    const {cards} = state[NameSpace.DATA_CARDS];
    const result = selectCards(state);
    expect(result).toEqual(cards);
  });
  it('Should return cardCurrent from state', () => {
    const {cardCurrent} = state[NameSpace.DATA_CARDS];
    const result = selectCardId(state);
    expect(result).toEqual(cardCurrent);
  });
  it('Should return similarProducts from state', () => {
    const {similarProducts} = state[NameSpace.DATA_CARDS];
    const result = selectSimilarProducts(state);
    expect(result).toEqual(similarProducts);
  });
  it('Should return isLoadibgDataRejected from state', () => {
    const {isLoadibgDataRejected} = state[NameSpace.DATA_CARDS];
    const result = selectLoadingStatusRejected(state);
    expect(result).toEqual(isLoadibgDataRejected);
  });
  it('Should return isLoadingData from state', () => {
    const {isLoadingData} = state[NameSpace.DATA_CARDS];
    const result = selectLoadingStatus(state);
    expect(result).toEqual(isLoadingData);
  });
});
