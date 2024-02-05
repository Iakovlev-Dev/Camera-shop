import { Link } from 'react-router-dom';
import { TCamera } from '../../types/type-camera';
import CardRating from '../card-rating/card-rating';
import { useAppDispatch } from '../../store/hooks';
import { fetchCardAction } from '../../store/api-action';
import classNames from 'classnames';

type TCard = {
  card: TCamera;
  onClick: () => void;
  active?: boolean;
}

export default function Card ({card, onClick, active}: TCard) {
  const pathCard = `/cameras/${card.id}`;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(fetchCardAction(card.id));
    if(onClick) {
      onClick();
    }
  };

  const productClass = classNames('product-card', {
    'is-active': active,
  });

  return (
    <div className={productClass} data-testid='product=card'>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${card.previewImgWebp && card.previewImgWebp2x} 2x`}
          />
          <img
            src={`/${card.previewImg}`}
            srcSet={`/${card.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={card.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <CardRating count={card.rating}/>
          <p className="visually-hidden">Рейтинг: {card.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{card.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {card.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{card.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => handleClick()}
        >
        Купить
        </button>
        <Link className="btn btn--transparent" to={pathCard} >
        Подробнее
        </Link>
      </div>
    </div>
  );
}
