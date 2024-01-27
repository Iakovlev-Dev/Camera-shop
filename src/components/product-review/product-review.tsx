import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectReviews } from '../../store/reviews-process/selectors';
import ProductReviewCard from '../product-review-card/product-review-card';
import ProductReviewButton from '../product-review-button/product-review-button';
import ProductReviewModal from '../product-review-add/product-review-add';
import { TEventKey } from '../../pages/page-main/page-main';


export default function ProductReview () {
  const reviews = useAppSelector(selectReviews);
  const [lastIndex, setLastIndex] = useState(3);
  const reviewSlice = reviews.slice(0, lastIndex);
  const handleClickReview = (numb: number) => {
    setLastIndex(numb + lastIndex);
  };
  // console.log(reviews);

  useEffect(()=> {
    setLastIndex(3);
  }, [reviews]);

  const [isOpenModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
    document.body.classList.add('scroll-lock');
  };

  const handleClickClose = () => {
    setOpenModal(false);
    document.body.classList.remove('scroll-lock');
  };

  useEffect(() => {
    const handleClickEsc = (evt: TEventKey) => {
      if(evt.key === 'Escape') {
        setOpenModal(false);
        document.body.classList.remove('scroll-lock');
      }
    };
    document.addEventListener('keydown', handleClickEsc);
    return () => document.removeEventListener('keydown', handleClickEsc);
  }, [setOpenModal]);


  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={handleClickOpen}>
                Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {reviewSlice.map((item) => <ProductReviewCard review={item} key={item.id}/>)}
          </ul>
          {reviews.length > reviewSlice.length ? <ProductReviewButton onClick={handleClickReview}/> : ''}
        </div>
      </section>
      {isOpenModal && <ProductReviewModal onClose={handleClickClose}/>}
    </div>
  );
}
