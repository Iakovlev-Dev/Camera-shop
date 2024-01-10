type TCardRating = {
    count: number;
}

const MAX_STARS = 5;

export default function CardRating ({count}: TCardRating) {
  const setFullStars = (number: number) => {
    const rating = [];
    for (let i = 1; i <= number; i++) {
      rating.push(
        <svg width={17} height={16} aria-hidden="true">
          <use xlinkHref="#icon-full-star" />
        </svg>
      );
    }
    for (let i = 1; i <= MAX_STARS - number; i++) {
      rating.push(
        <svg width={17} height={16} aria-hidden="true">
          <use xlinkHref="#icon-star" />
        </svg>
      );
    }
    return rating;
  };

  return (
    setFullStars(count)
  );
}
