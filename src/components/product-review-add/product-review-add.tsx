import ProductReviewForm from '../product-review-form/product-review-form';

type TProductReviewModal = {
    onClose: () => void;
}

export default function ProductReviewModal ({onClose}: TProductReviewModal) {
  return (
    <div className="modal is-active"
      onClick={(evt) => {
        if ((evt.target as Element).className === 'modal__overlay') {
          onClose();
        }
      }}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <ProductReviewForm onClose={onClose}/>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onClose()}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}
