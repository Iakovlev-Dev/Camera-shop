import { TPromo } from '../../types/type-promo';

type TPromoProps = {
    promo: TPromo;
}

export default function Promo ({promo}: TPromoProps) {

  return (
    <>
      <picture>
        <source
          type="image/webp"
          srcSet={promo.previewImgWebp}
        />
        <img
          src={promo.previewImg}
          srcSet={promo.previewImg2x}
          width={1280}
          height={280}
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {promo.name}
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <a className="btn" href="#">
          Подробнее
        </a>
      </p>
    </>
  );
}
