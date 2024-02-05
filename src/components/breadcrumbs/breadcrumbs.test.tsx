import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import { makeFakeCamera } from '../../mocks/mocks';
import Breadcrumbs from './breadcrumbs';

describe('Component: Breadcrumbs', () => {
  it('should return correct', () => {
    const mockCamera = makeFakeCamera();
    const breadcrumbsTestId = 'breadcrumbs-container';
    const preparedComponent = withHistory(<Breadcrumbs card={mockCamera}/>);

    render(preparedComponent);
    const breadcrumbsContainer = screen.getByTestId(breadcrumbsTestId);
    expect(breadcrumbsContainer).toBeInTheDocument();
  });
});
