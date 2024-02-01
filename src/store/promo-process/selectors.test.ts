import { NameSpace } from '../../const';
import { makeFakePromo, makeFakeStore } from '../../mocks/mocks';
import { selectPromo } from './selectors';

describe('SelectorsPromo', () => {
  const mockPromo = makeFakePromo();
  const state = makeFakeStore({
    [NameSpace.PROMO]: {
      promo: [mockPromo]
    }
  });

  it('Should return promo from state', () => {
    const {promo} = state[NameSpace.PROMO];
    const result = selectPromo(state);
    expect(result).toEqual(promo);
  });
});
