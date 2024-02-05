import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import ProductReviewModal from './product-review-modal';

describe('Component: ProductReviewModal', () => {
  it('should render correct', () => {
    const mockOnClose = vi.fn();
    const { withStoreComponent } = withStore(<ProductReviewModal onClose={mockOnClose}/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });
});
