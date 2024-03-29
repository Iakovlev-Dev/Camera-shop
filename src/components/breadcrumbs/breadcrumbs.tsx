import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { TCamera } from '../../types/type-camera';

type TBreadcrumbs = {
    card: TCamera;
}

export default function Breadcrumbs ({card}: TBreadcrumbs) {
  return (card &&
    <div className="breadcrumbs" data-testid='breadcrumbs-container'>
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link" href="index.html">
                Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </a>
          </li>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>
                Каталог
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">
              {card.name}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
