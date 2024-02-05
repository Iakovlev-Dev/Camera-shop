import { render, screen } from '@testing-library/react';
import { makeFakeCamera } from '../../mocks/mocks';
import { withHistory, withStore } from '../../mocks/mock-component';
import Card from './card';

describe('Component: Card', () => {
  it('should render correct', () => {
    const mockCamera = makeFakeCamera();
    const mockOnClick = vi.fn();
    const cardTestId = 'product=card';

    const {withStoreComponent} = withStore(<Card card={mockCamera} onClick={mockOnClick}/>, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(cardTestId)).toBeInTheDocument();
  });
});
