import { Link } from 'react-router-dom';
import { selectCards } from '../../store/data-card-process/selectors';
import { useAppSelector } from '../../store/hooks';
import { TPromo } from '../../types/type-promo';


type TPromoProps = {
    promo: TPromo;
}

export default function Promo ({promo}: TPromoProps) {
  const cards = useAppSelector(selectCards);
  const currentCamera = cards?.find((item) => promo.id === item.id);
  const pathCard = `/cameras/${promo.id}`;

  return (currentCamera &&
    <div className="banner">
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
          {currentCamera.description}
        </span>
        <Link className="btn" to={pathCard}>
          Подробнее
        </Link>
      </p>
    </div>
  );
}
