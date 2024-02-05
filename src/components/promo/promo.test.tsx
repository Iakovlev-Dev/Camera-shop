import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../const';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeCamera, makeFakePromo, makeFakeStore } from '../../mocks/mocks';
import Promo from './promo';

describe('Component: Promo', () => {
  it('should return correct', () => {
    const mockPromo = makeFakePromo();
    const mockCurrentCamera = makeFakeCamera();
    const promoTestId = 'promo';
    const promoText = 'Новинка!';

    const { withStoreComponent } = withStore(<Promo promo={mockPromo}/>, makeFakeStore({
      [NameSpace.DATA_CARDS]: {cardCurrent: mockCurrentCamera, cards: [], similarProducts: [mockCurrentCamera], isLoadingData: true, isLoadibgDataRejected: true}
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const promoComponent = screen.getByTestId(promoTestId);
    const promoTextExpected = screen.getByText(promoText);
    expect(promoComponent).toBeInTheDocument();
    expect(promoTextExpected).toBeInTheDocument();
  });
});
