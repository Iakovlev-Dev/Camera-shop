import { render, screen } from '@testing-library/react';
import { FilterCategory } from '../../const';
import FilterByCategory from './filter-by-category';


describe('Component: FilterByCategory', () => {
  it('should render correct', () => {
    const filterItemTestId = 'filter-item';
    const filterLength = Object.keys(FilterCategory).length;

    render(<FilterByCategory />);

    const filterItems = screen.getAllByTestId(filterItemTestId);
    expect(filterItems.length).toBe(filterLength);
  });
});
