import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import PaginationPage from './pagination-page';


describe('Component: PaginationPage', () => {
  it('should render correct', () => {
    const mockPage = 4;
    const mockCurrentPage = 2;
    const mockOnClick = vi.fn();
    const { withStoreComponent } = withStore(<PaginationPage page={mockPage} currentPage={mockCurrentPage} onClick={mockOnClick}/>, {});
    const preparedComponent = withHistory(withStoreComponent);


    render(preparedComponent);

    expect(screen.getByText(mockPage)).toBeInTheDocument();
  });
});
