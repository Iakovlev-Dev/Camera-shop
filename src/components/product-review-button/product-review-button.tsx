import { MAX_REVIEW } from '../../const';

type TProductReviewButton = {
    onClick: (numb: number) => void;
}


export default function ProductReviewButton ({onClick}: TProductReviewButton) {

  return (
    <div className="review-block__buttons">
      <button className="btn btn--purple" type="button" onClick={() => onClick(MAX_REVIEW)}>
                Показать больше отзывов
      </button>
    </div>
  );
}
