import { render, screen } from '@testing-library/react';
import { useWithForm, withHistory, withStore } from '../../mocks/mock-component';
import ProductReviewRating from './product-review-rating';


describe('Component: ProductReviewRating', () => {
  it('should render correct', () => {
    const mockOnChange = vi.fn();
    const { withStoreComponent } = withStore(<ProductReviewRating onChange={mockOnChange}/>, {});
    const preparedComponent = withHistory(withStoreComponent);
    const renderComponent = useWithForm(preparedComponent);

    render(renderComponent);
    expect(screen.getByTestId('rate__group')).toBeInTheDocument();
  });
});
