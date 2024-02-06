import { MAX_COUNT_STARS, MIN_COUNT_STARS } from '../../const';

type TCardRating = {
    count: number;
}

export default function CardRating ({count}: TCardRating) {
  const setFullStars = (number: number) => {
    const rating = [];
    for (let i = MIN_COUNT_STARS; i <= number; i++) {
      rating.push(
        <svg width={17} height={16} aria-hidden="true" key={i} >
          <use xlinkHref="#icon-full-star" />
        </svg>
      );
    }
    for (let i = MAX_COUNT_STARS; i > number; i--) {
      rating.push(
        <svg width={17} height={16} aria-hidden="true" key={i} >
          <use xlinkHref="#icon-star" />
        </svg>
      );
    }
    return rating;
  };

  return (
    <div data-testid='card-rating'>
      {setFullStars(count)}
    </div>
  );
}
