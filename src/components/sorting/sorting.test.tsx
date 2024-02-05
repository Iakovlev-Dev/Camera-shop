import { render, screen } from '@testing-library/react';
import Sorting from './sorting';
import { SortBy } from '../../const';

describe('Componet: Sorting', () => {
  it('should render correct', () => {
    const sortingTestId = 'sorting-item';
    const lengthSortBy = Object.values(SortBy).length;

    render(<Sorting />);
    const sortingItem = screen.getAllByTestId(sortingTestId);

    expect(sortingItem.length).toBe(lengthSortBy);
  });
});
