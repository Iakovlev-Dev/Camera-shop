import { render, screen } from '@testing-library/react';
import FilterByLevel from './filter-by-level';
import { FilterLevel } from '../../const';

describe('Component: FilterByLevel', () => {
  it('should render correct', () => {
    const filterLevelTestId = 'filter-level';
    const filterlength = Object.keys(FilterLevel).length;

    render(<FilterByLevel />);
    const filterItems = screen.getAllByTestId(filterLevelTestId);
    expect(filterItems.length).toBe(filterlength);
  });
});
