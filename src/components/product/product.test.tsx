import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeCamera } from '../../mocks/mocks';
import Product from './product';


describe('Component: Product', () => {
  it('should render correct', () => {
    const mockCurrentCard = makeFakeCamera();
    const mockOnClose = vi.fn();
    const { withStoreComponent } = withStore(<Product card={mockCurrentCard} onClick={mockOnClose}/>, {});
    const preparedComponent = withHistory(withStoreComponent);


    render(preparedComponent);

    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
