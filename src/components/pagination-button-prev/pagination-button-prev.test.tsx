import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import ButtonPagination from './pagination-button-prev';

describe('Component: ButtonPagination', () => {
  it('should render correct button "Назад"', () => {
    const mockButton = 'prev';
    const mockOnClick = vi.fn();
    const mockOnClickDown = vi.fn();

    const { withStoreComponent } = withStore(<ButtonPagination button={mockButton} onClick={mockOnClick} onKeyDown={mockOnClickDown}/>, {});
    const preparedCompoent = withHistory(withStoreComponent);

    render(preparedCompoent);
    expect(screen.getByText('Назад')).toBeInTheDocument();
  });
  it('should render correct button "Далее"', () => {
    const mockButton = 'next';
    const mockOnClick = vi.fn();

    const { withStoreComponent } = withStore(<ButtonPagination button={mockButton} onClick={mockOnClick} onKeyDown={mockOnClick}/>, {});
    const preparedCompoent = withHistory(withStoreComponent);

    render(preparedCompoent);
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
});
