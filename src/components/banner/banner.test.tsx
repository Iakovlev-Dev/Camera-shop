import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import Banner from './banner';
import { makeFakePromo, makeFakeStore } from '../../mocks/mocks';
import { NameSpace } from '../../const';

describe('Component: Banner', () => {
  it('should return correct', () => {
    const mockPromo = [makeFakePromo()];
    const bannerTestId = 'banner';
    const { withStoreComponent } = withStore(<Banner />, makeFakeStore({
      [NameSpace.PROMO]: {promo: mockPromo}
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const bannerComponent = screen.getByTestId(bannerTestId);
    expect(bannerComponent).toBeInTheDocument();

  });
});
