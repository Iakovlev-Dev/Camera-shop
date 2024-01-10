type TCardRating = {
    count: number;
}

export default function CardRating ({count}: TCardRating) {
  const setFullStars = (number: number) => {
    const rating = [];
    for (let i = 1; i <= number; i++) {
      rating.push(
        <svg width={17} height={16} aria-hidden="true" key={i}>
          <use xlinkHref="#icon-full-star" />
        </svg>
      );
    }
    for (let i = 5; i > number; i--) {
      rating.push(
        <svg width={17} height={16} aria-hidden="true" key={i}>
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
