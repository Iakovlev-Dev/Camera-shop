import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import PopupAddCameras from './popup-add-camera';
import { NameSpace } from '../../const';
import { makeFakeCamera } from '../../mocks/mocks';


describe('Component: PopupAddCameras', () => {
  it('should render correct', () => {
    const mockCurrentCard = makeFakeCamera();
    const mockOnClose = vi.fn();
    const { withStoreComponent } = withStore(<PopupAddCameras onClose={mockOnClose}/>, {
      [NameSpace.DATA_CARDS]: {
        similarProducts: [],
        cards: [],
        cardCurrent: mockCurrentCard,
        isLoadibgDataRejected: false,
        isLoadingData: false
      }
    });
    const preparedComponent = withHistory(withStoreComponent);


    render(preparedComponent);

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
