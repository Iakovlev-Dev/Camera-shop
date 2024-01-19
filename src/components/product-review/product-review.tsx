import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectReviews } from '../../store/reviews-process/selectors';
import ProductReviewCard from '../product-review-card/product-review-card';
import ProductReviewButton from '../product-review-button/product-review-button';


export default function ProductReview () {
  const reviews = useAppSelector(selectReviews);
  const [lastIndex, setLastIndex] = useState(3);
  const reviewSlice = reviews.slice(0, lastIndex);
  const handleClickReview = (numb: number) => {
    setLastIndex(numb + lastIndex);
  };

  useEffect(()=> {
    setLastIndex(3);
  }, [reviews]);


  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">
                Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {reviewSlice.map((item) => <ProductReviewCard review={item} key={item.id}/>)}
          </ul>
          {reviews.length > reviewSlice.length ? <ProductReviewButton onClick={handleClickReview}/> : ''}
        </div>
      </section>
    </div>
  );
}
