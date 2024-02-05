import { render, screen } from '@testing-library/react';
import { FilterType } from '../../const';
import FilterByType from './filter-by-type';

describe('Component: FilterByCategory', () => {
  it('should return correct', () => {
    const filterTypeTestId = 'filter-type';
    const filterLength = Object.keys(FilterType).length;

    render(<FilterByType />);
    const filterItems = screen.getAllByTestId(filterTypeTestId);
    expect(filterItems.length).toBe(filterLength);
  });
});
