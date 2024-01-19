type TProductReviewButton = {
    onClick: (numb: number) => void;
}
const MAX_REVIEW = 3;

export default function ProductReviewButton ({onClick}: TProductReviewButton) {

  return (
    <div className="review-block__buttons">
      <button className="btn btn--purple" type="button" onClick={() => onClick(MAX_REVIEW)}>
                Показать больше отзывов
      </button>
    </div>
  );
}
