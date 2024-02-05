import { render, screen } from '@testing-library/react';
import { SortBtn } from '../../const';
import SortingBtn from './sorting-btn';

describe('Component: Sorting-btn', () => {
  it('should render correct', () => {
    const sortinBtnTestId = 'sorting-btn';
    const lengthSortBtn = Object.keys(SortBtn).length;
    render(<SortingBtn />);

    const sortinBtnItems = screen.getAllByTestId(sortinBtnTestId);
    expect(sortinBtnItems.length).toBe(lengthSortBtn);
  });
});
