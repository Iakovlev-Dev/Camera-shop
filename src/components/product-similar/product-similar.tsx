import { useState } from 'react';
import { selectSimilarProducts } from '../../store/data-card-process/selectors';
import { useAppSelector } from '../../store/hooks';
import Card from '../card/card';
import PopupAddCameras from '../popup-add-camera/popup-add-camera';

const MAX_SIMILAR_PRODUCTS = 3;

export default function ProductSimilar() {
  const similarProducts = useAppSelector(selectSimilarProducts);
  const [isOpenPopup, setActive] = useState(false);
  const [firstIndexSimilar, setFirstIndexSimilar] = useState(0);
  const [lastIndexSimilar, setLastIndexSimilar] = useState(3);

  if(!similarProducts) {
    return;
  }

  const similarProductsSliced = similarProducts.slice(firstIndexSimilar, lastIndexSimilar);

  const handleOpenPopup = () => {
    setActive(true);
  };

  const handleClosePopup = () => {
    setActive(false);
  };

  const handleNextButton = () => {
    setFirstIndexSimilar(firstIndexSimilar + MAX_SIMILAR_PRODUCTS);
    setLastIndexSimilar(lastIndexSimilar + MAX_SIMILAR_PRODUCTS);
  };

  const handlePrevButton = () => {
    setFirstIndexSimilar(firstIndexSimilar - MAX_SIMILAR_PRODUCTS);
    setLastIndexSimilar(lastIndexSimilar - MAX_SIMILAR_PRODUCTS);
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarProductsSliced.map((item) => <Card card={item} key={item.id} onClick={handleOpenPopup} active/>)}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled={firstIndexSimilar <= 0}
              onMouseDown={() => handlePrevButton()}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onMouseDown={() => handleNextButton()}
              disabled={lastIndexSimilar >= similarProducts.length}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      {isOpenPopup && <PopupAddCameras onClose={handleClosePopup}/>}
    </div>

  );
}
