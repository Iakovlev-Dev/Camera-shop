import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCards } from '../../store/data-card-process/selectors';
import Header from '../../components/header/header';
import ProductSimilar from '../../components/product-similar/product-similar';
import { useEffect, useState } from 'react';
import { fetchCardAction, fetchReviewsAction, fetchSimilarProductsAction } from '../../store/api-action';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import PopupAddCameras from '../../components/popup-add-camera/popup-add-camera';
import { TEventKey } from '../page-main/page-main';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Product from '../../components/product/product';
import ProductReview from '../../components/product-review/product-review';
import { Helmet } from 'react-helmet-async';
import { selectPostSuccess } from '../../store/reviews-process/selectors';

import ProductReviewSuccess from '../../components/product-review-success/product-review-success';
import { setCardId } from '../../store/data-card-process/data-card-process';


export default function PageCamera () {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const currentCard = useAppSelector(selectCards).find((item: { id: number }) => item.id === Number(id));
  const isPostReview = useAppSelector(selectPostSuccess);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if(id && currentCard) {
      dispatch(fetchSimilarProductsAction(Number(id)));
      dispatch(fetchReviewsAction(Number(id)));
      dispatch(setCardId(currentCard));
    }
  }, [currentCard, dispatch, id]);

  const handleClickAdd = (cardId: number) => {
    setIsAdd(true);
    document.body.classList.add('scroll-lock');
    dispatch(fetchCardAction(cardId));
  };
  const handleCloseAdd = () => {
    setIsAdd(false);
    document.body.classList.remove('scroll-lock');
  };

  useEffect(() => {
    const handleClickEsc = (evt: TEventKey) => {
      if (evt.key === 'Escape') {
        setIsAdd(false);
        document.body.classList.remove('scroll-lock');
      }
    };
    document.addEventListener('keydown', handleClickEsc);
    return () => document.removeEventListener('keydown', handleClickEsc);
  }, [setIsAdd]);

  if(!currentCard) {
    return (
      <>
      </>
    );
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{currentCard?.name}</title>
      </Helmet>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs card={currentCard}/>
          <Product card={currentCard} onClick={handleClickAdd}/>
          <ProductSimilar />
          <ProductReview />
        </div>
        {isAdd && <PopupAddCameras onClose={handleCloseAdd}/>}
        {isPostReview && <ProductReviewSuccess />}
      </main>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
      <Footer />
    </div>

  );
}
