import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCardId } from '../../store/data-card-process/selectors';
import Header from '../../components/header/header';
import ProductSimilar from '../../components/product-similar/product-similar';
import { useEffect, useState } from 'react';
import { fetchCardAction } from '../../store/api-action';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import PopupAddCameras from '../../components/popup-add-camera/popup-add-camera';
import { TEventKey } from '../page-main/page-main';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Product from '../../components/product/product';
import ProductReview from '../../components/product-review/product-review';


export default function PageCamera () {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const currentCard = useAppSelector(selectCardId);

  useEffect(() => {
    dispatch(fetchCardAction(Number(id)));
  }, [dispatch, id]);


  const handleClickAdd = () => {
    setIsAdd(true);
    document.body.classList.add('scroll-lock');
  };
  const handleCloseAdd = () => {
    setIsAdd(false);
    document.body.classList.remove('scroll-lock');
  };

  useEffect(() => {
    const handleClickEsc = (evt: TEventKey) => {
      if (evt.key === 'Escape') {
        setIsAdd(false);
      }
    };
    document.addEventListener('keydown', handleClickEsc);
    return () => document.removeEventListener('keydown', handleClickEsc);
  }, [setIsAdd]);


  return (currentCard &&
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs card={currentCard}/>
          <Product card={currentCard} onClick={handleClickAdd}/>
          <ProductSimilar />
          <ProductReview />
        </div>
        {isAdd && <PopupAddCameras onClose={handleCloseAdd}/>}
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
