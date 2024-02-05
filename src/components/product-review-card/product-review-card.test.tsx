import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../mocks/mocks';
import ProductReviewCard from './product-review-card';

describe('Component: ProductReviewCard', () => {
  it('should render correct', () => {
    const reviewCardTestId = 'review-card';
    const mockReview = makeFakeReview();

    render(<ProductReviewCard review={mockReview}/>);
    const reviewCardContainer = screen.getByTestId(reviewCardTestId);
    expect(reviewCardContainer).toBeInTheDocument();
  });
});
