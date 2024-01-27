import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPostSuccess } from '../../store/reviews-process/review-process';
import { TEventKey } from '../../pages/page-main/page-main';
import { selectPostSuccess } from '../../store/reviews-process/selectors';

export default function ProductReviewSuccess () {
  const dispatch = useAppDispatch();
  const isPostSuccess = useAppSelector(selectPostSuccess);
  const handleClosePopup = () => {
    dispatch(setPostSuccess(false));
    document.body.classList.remove('scroll-lock');
  };

  useEffect(() => {
    const handleClickEsc = (evt: TEventKey) => {
      if(evt.key === 'Escape') {
        document.removeEventListener('keydown', handleClickEsc);
        dispatch(setPostSuccess(false));
        document.body.classList.remove('scroll-lock');
      }
    };
    document.addEventListener('keydown', handleClickEsc);
    return () => document.removeEventListener('keydown', handleClickEsc);
  }, [dispatch, isPostSuccess]);

  return (
    <div className="modal is-active modal--narrow"
      onClick={(evt) => {
        if((evt.target as Element).className === 'modal__overlay') {
          handleClosePopup();
        }
      }}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width={80} height={78} aria-hidden="true">
            <use xlinkHref="#icon-review-success" />
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => handleClosePopup()}
            >
          Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => handleClosePopup()}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
