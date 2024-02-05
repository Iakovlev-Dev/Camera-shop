import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import Header from './header';

describe('Component: Header', () => {
  it('should render correct', () => {
    const headerTestId = 'header-container';
    const expectedText = 'Каталог';
    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);
    const headerContainer = screen.getByTestId(headerTestId);
    expect(headerContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
