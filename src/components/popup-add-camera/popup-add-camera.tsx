import { selectCardId } from '../../store/data-card-process/selectors';
import { useAppSelector } from '../../store/hooks';

type TPopupAdd = {
  onClose: () => void;
}

export default function PopupAddCameras ({onClose}:TPopupAdd) {

  const cardCurrent = useAppSelector(selectCardId);

  return (cardCurrent &&
    <div className="modal is-active"
      onClick={
        (evt) => {
          if((evt.target as Element).className === 'modal__overlay') {
            onClose();
          }
        }
      }
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={cardCurrent.previewImgWebp}
                />
                <img
                  src={cardCurrent.previewImg}
                  srcSet={cardCurrent.previewImg2x}
                  width={140}
                  height={120}
                  alt={cardCurrent.name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{cardCurrent.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{cardCurrent.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{cardCurrent.type}</li>
                <li className="basket-item__list-item">{cardCurrent.level}</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{cardCurrent.price} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
          Добавить в корзину
            </button>
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
