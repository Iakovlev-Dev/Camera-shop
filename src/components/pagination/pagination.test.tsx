import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render correct', () => {
    const mockCount = 4;
    const mockCurrentPage = 2;
    const mockSetPage = vi.fn();
    const { withStoreComponent } = withStore(<Pagination count={mockCount} currentPage={mockCurrentPage} setPage={mockSetPage}/>, {});
    const preparedComponent = withHistory(withStoreComponent);
    const paginationTestId = 'pagination';

    render(preparedComponent);

    expect(screen.getByTestId(paginationTestId)).toBeInTheDocument();
  });
});
