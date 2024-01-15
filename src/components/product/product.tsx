import { TCamera } from '../../types/type-camera';
import CardRating from '../card-rating/card-rating';
import { useState } from 'react';

type TProduct = {
    card: TCamera;
    onClick: () => void;
}


export default function Product ({card, onClick}: TProduct) {


  const [isActiveSpecs, setActiveSpecs] = useState(true);
  const [isActiveDesc, setActiveDesc] = useState(false);

  const handleClick = () => {
    setActiveSpecs(!isActiveSpecs);
    setActiveDesc(!isActiveDesc);
  };

  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source
                type="image/webp"
                srcSet={card.previewImgWebp2x}
              />
              <img
                src={card.previewImg}
                srcSet={card.previewImg2x}
                width={560}
                height={480}
                alt={card.name}
              />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{card.name}</h1>
            <div className="rate product__rate">
              <CardRating count={card.rating} />
              <p className="visually-hidden">Рейтинг: {card.rating}</p>
              <p className="rate__count">
                <span className="visually-hidden">Всего оценок:</span>{card.reviewCount}
              </p>
            </div>
            <p className="product__price">
              <span className="visually-hidden">Цена:</span>{card.price} ₽
            </p>
            <button className="btn btn--purple" type="button" onClick={() => onClick()}>
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
                Добавить в корзину
            </button>
            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button className={`tabs__control ${isActiveSpecs ? 'is-active' : ''}`} type="button" onClick={() => handleClick()}>
                    Характеристики
                </button>
                <button className={`tabs__control ${isActiveDesc ? 'is-active' : ''}`} type="button" onClick={() => handleClick()}>
                    Описание
                </button>
              </div>
              <div className="tabs__content">
                <div className={`tabs__element ${isActiveSpecs ? 'is-active' : ''}`}>
                  <ul className="product__tabs-list">
                    <li className="item-list">
                      <span className="item-list__title">Артикул:</span>
                      <p className="item-list__text">{card.vendorCode}</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Категория:</span>
                      <p className="item-list__text">{card.category}</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Тип камеры:</span>
                      <p className="item-list__text">{card.type}</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Уровень:</span>
                      <p className="item-list__text">{card.level}</p>
                    </li>
                  </ul>
                </div>
                <div className={`tabs__element ${isActiveDesc ? 'is-active' : ''}`}>
                  <div className="product__tabs-text">
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}