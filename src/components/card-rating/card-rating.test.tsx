import { render, screen } from '@testing-library/react';
import CardRating from './card-rating';

describe('Component: CardRating', () => {
  it('should render correct', () => {
    const cardRatinTestId = 'card-rating';
    const countRating = 4;

    render(<CardRating count={countRating} />);

    const cardRatingItems = screen.getByTestId(cardRatinTestId);
    expect(cardRatingItems).toBeInTheDocument();
  });
});
