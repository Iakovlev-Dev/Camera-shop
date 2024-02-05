import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import ProductReviewButton from './product-review-button';


describe('Component: ProductReviewButton', () => {
  it('should render correct', () => {
    const mockOnclick = vi.fn();
    const { withStoreComponent } = withStore(<ProductReviewButton onClick={mockOnclick}/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
