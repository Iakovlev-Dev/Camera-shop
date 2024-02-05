import { TReviews } from '../../types/type-reviews';
import { dateFormatReview } from '../../utils';
import CardRating from '../card-rating/card-rating';

type TProductReviewCard = {
  review: TReviews;
}

export default function ProductReviewCard ({review}: TProductReviewCard) {

  return (
    <li className="review-card" data-testid='review-card'>
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={review.createAt}>
          {dateFormatReview(review.createAt)}
        </time>
      </div>
      <div className="rate review-card__rate">
        <CardRating count={review.rating} />
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}
