import { Rating, RatingNumb } from '../const';

export default function ProductReviewRating () {
  return (
    <div className="rate__group">
      {Object.keys(Rating).map((item) => (
        <>
          <input
            className="visually-hidden"
            id={`star-${RatingNumb[item]}`}
            name="rate"
            type="radio"
            defaultValue={RatingNumb[item]}
          />
          <label
            className="rate__label"
            htmlFor={`star-${RatingNumb[item]}`}
            title={Rating[item]}
          />
        </>

      ))}
    </div>
  );
}
