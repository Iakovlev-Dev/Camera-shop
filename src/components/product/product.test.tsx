import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeCamera, makeFakeReview } from '../../mocks/mocks';
import Product from './product';
import { NameSpace } from '../../const';


describe('Component: Product', () => {
  it('should render correct', () => {
    const review = [makeFakeReview()];
    const mockCurrentCard = makeFakeCamera();
    const mockOnClose = vi.fn();
    const { withStoreComponent } = withStore(<Product card={mockCurrentCard} onClick={mockOnClose}/>, {
      [NameSpace.REVIEW]: {
        reviews: review,
        isPostSuccess: false
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
