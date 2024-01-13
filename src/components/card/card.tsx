import { Link } from 'react-router-dom';
import { TCamera } from '../../types/type-camera';
import CardRating from '../card-rating/card-rating';

type TCard = {
  card: TCamera;
  clickEsc: (arg0: TCamera) => void;
}

export default function Card ({card, clickEsc}: TCard) {
  const pathCard = `/cameras/${card.id}`;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={card.previewImgWebp}
          />
          <img
            src={card.previewImg}
            srcSet={card.previewImg2x}
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
          onClick={() => clickEsc(card)}
        >
        Купить
        </button>
        <Link className="btn btn--transparent" to={pathCard}>
        Подробнее
        </Link>
      </div>
    </div>
  );
}