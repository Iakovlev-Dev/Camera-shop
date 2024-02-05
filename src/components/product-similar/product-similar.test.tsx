import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import ProductSimilar from './product-similar';
import { makeFakeCamera, makeFakeStore } from '../../mocks/mocks';
import { NameSpace } from '../../const';

describe('Component: ProductSimilar', () => {
  it('should render correct', () => {
    const productSimilarTestId = 'product-similar';
    const mockSimilarProducts = [makeFakeCamera()];

    const { withStoreComponent } = withStore(<ProductSimilar />, makeFakeStore({
      [NameSpace.DATA_CARDS]: {similarProducts: mockSimilarProducts, cards: [], cardCurrent: null, isLoadibgDataRejected: false, isLoadingData: false}
    }));
    const prepareComponent = withHistory(withStoreComponent);

    render(prepareComponent);
    const productSimilarComponent = screen.getByTestId(productSimilarTestId);
    expect(productSimilarComponent).toBeInTheDocument();

  });
});
