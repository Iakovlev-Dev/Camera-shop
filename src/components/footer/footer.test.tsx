import {render} from '@testing-library/react';
import Footer from './footer';

describe('Component: footer', () => {
  it('should render correctly', () => {
    render(<Footer />);
    const result = document.getElementsByClassName('footer').length;
    expect(result).toBe(1);
  });
});
