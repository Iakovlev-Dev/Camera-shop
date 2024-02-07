import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import ProductReview from './product-review';
import { NameSpace } from '../../const';
import { makeFakeReview } from '../../mocks/mocks';

describe('Component: ProductReview', () => {
  it('should render correct', () => {
    const mockReview = [makeFakeReview()];
    const { withStoreComponent } = withStore(<ProductReview />, {
      [NameSpace.REVIEW]: {
        reviews: mockReview,
        isPostSuccess: true
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
  });
});
