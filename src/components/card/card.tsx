import { TCamera } from '../../types/type-camera';
import CardRating from '../card-rating/card-rating';

type TCard = {
  card: TCamera;
}

export default function Card ({card}: TCard) {

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
        >
        Купить
        </button>
        <a className="btn btn--transparent" href="#">
        Подробнее
        </a>
      </div>
    </div>
  );
}
