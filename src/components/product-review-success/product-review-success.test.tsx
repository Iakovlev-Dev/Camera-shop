import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mocks';
import { NameSpace } from '../../const';
import ProductReviewSuccess from './product-review-success';

describe('Component: ProductReviewSuccess', () => {
  it('should render correct', () => {

    const { withStoreComponent } = withStore(<ProductReviewSuccess />, makeFakeStore({
      [NameSpace.REVIEW]: {
        isPostSuccess: true,
        reviews: [],
      }
    }));
    const prepareComponent = withHistory(withStoreComponent);

    render(prepareComponent);

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();

  });
});
