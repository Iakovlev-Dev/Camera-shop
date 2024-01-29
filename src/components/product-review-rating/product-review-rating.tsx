import { useFormContext } from 'react-hook-form';
import { Rating, RatingNumb } from '../../const';

type TProductReviewRating = {
  onChange: (value: number) => void;
}

export default function ProductReviewRating ({onChange}: TProductReviewRating) {

  const { register } = useFormContext();
  return (
    <div className="rate__group">
      {Object.keys(Rating).map((item) => (
        <>
          <input
            {...register('rating', {
              required: 'Нужно оценить товар'
            })}
            className="visually-hidden"
            id={`star-${RatingNumb[item]}`}
            name="rate"
            type="radio"
            value={RatingNumb[item]}
            key={item}
            onChange={() => onChange(Number(RatingNumb[item]))}
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
