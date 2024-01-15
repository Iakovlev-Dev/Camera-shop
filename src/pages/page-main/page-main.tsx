import Header from '../../components/header/header';
import FilterByCategory from '../../components/filter-by-category/filter-by-category';
import FilterByType from '../../components/filter-by-type/filter-by-type';
import FilterByLevel from '../../components/filter-by-level/filter-by-level';
import Sorting from '../../components/sorting/sorting';
import SortingBtn from '../../components/sorting-btn/sorting-btn';
import Footer from '../../components/footer/footer';
import Card from '../../components/card/card';
import { useAppSelector } from '../../store/hooks';
import { selectCards } from '../../store/data-card-process/selectors';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { useEffect, useState } from 'react';
import PopupAddCameras from '../../components/popup-add-camera/popup-add-camera';

const CARD_ON_PAGE = 9;

export type TEventKey = {
  key: string;
  preventDefault: () => void;
}

export default function PageMain () {
  const cards = useAppSelector(selectCards);
  const [currentPage, setCurrentPage] = useState(1);
  const lastCardIndex = currentPage * CARD_ON_PAGE;
  const firstCardIndex = lastCardIndex - CARD_ON_PAGE;
  const currentCardPage = cards?.slice(firstCardIndex, lastCardIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [isOpenModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
    document.body.classList.add('scroll-lock');
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    document.body.classList.remove('scroll-lock');
  };

  useEffect(() => {
    const handleClickEsc = (evt: TEventKey) => {
      if (evt.key === 'Escape') {
        setOpenModal(false);
      }
    };
    document.addEventListener('keydown', handleClickEsc);
    return () => document.removeEventListener('keydown', handleClickEsc);
  }, [isOpenModal]);


  if(!cards) {
    return;
  }

  const countPages = Math.ceil(cards.length / CARD_ON_PAGE);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <div className="breadcrumbs">
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
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input type="number" name="price" placeholder="от" />
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input
                                type="number"
                                name="priceUp"
                                placeholder="до"
                              />
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <FilterByCategory />
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <FilterByType />
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <FilterByLevel />
                      </fieldset>
                      <button
                        className="btn catalog-filter__reset-btn"
                        type="reset"
                      >
                    Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <Sorting />
                        </div>
                        <div className="catalog-sort__order">
                          <SortingBtn />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="cards catalog__cards">
                    {currentCardPage?.map((item) =>
                      (
                        <Card
                          key={item.id}
                          card={item}
                          onClick={() => handleOpenModal()}
                        />))}
                  </div>
                  <Pagination count={countPages} currentPage={currentPage} setPage={paginate}/>
                </div>
              </div>
            </div>
          </section>
        </div>
        {isOpenModal && <PopupAddCameras onClose={handleCloseModal} />}
      </main>
      <Footer />
    </div>
  );
}
