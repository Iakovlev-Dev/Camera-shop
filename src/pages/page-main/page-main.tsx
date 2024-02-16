import Header from '../../components/header/header';
import Sorting from '../../components/sorting/sorting';
import SortingBtn from '../../components/sorting-btn/sorting-btn';
import Footer from '../../components/footer/footer';
import Card from '../../components/card/card';
import { useAppSelector } from '../../store/hooks';
import { selectCards, selectLoadingStatusRejected } from '../../store/data-card-process/selectors';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { useEffect, useState } from 'react';
import PopupAddCameras from '../../components/popup-add-camera/popup-add-camera';
import { Helmet } from 'react-helmet-async';
import { CARD_ON_PAGE, FilterCategory } from '../../const';
import { selectActiveSortBtn, selectActiveSortBy } from '../../store/sorting-process/selectors';
import { filtredCategory, sortingBy } from '../../utils';
import { TCameraArray } from '../../types/type-camera';

import Filters from '../../components/filters/filters';

export type TEventKey = {
  key: string;
  preventDefault: () => void;
}

export default function PageMain () {
  const sortBtn = useAppSelector(selectActiveSortBtn);
  const sortBy = useAppSelector(selectActiveSortBy);
  const cards = useAppSelector(selectCards);
  const sortedCards = sortingBy(sortBy, sortBtn, [...cards]);

  const [currentPage, setCurrentPage] = useState(1);
  const lastCardIndex = currentPage * CARD_ON_PAGE;
  const firstCardIndex = lastCardIndex - CARD_ON_PAGE;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  const isLoadingStatusRejected = useAppSelector(selectLoadingStatusRejected);

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
        document.body.classList.remove('scroll-lock');
      }
    };
    document.addEventListener('keydown', handleClickEsc);
    return () => document.removeEventListener('keydown', handleClickEsc);
  }, [isOpenModal]);

  const [categoryFiltersType, setCategoryFiltersType] = useState(new Set());
  const [categoryFiltersLevel, setCategoriesFiltersLevel] = useState(new Set());
  const [categoryFiltersCategory, setCategoryFiltersCategory] = useState('');

  const handleFilterChangeType = (checked: boolean, filter: string) => {
    if(checked) {
      setCategoryFiltersType((prev) => new Set(prev).add(filter));
      setCurrentPage(1);
    }
    if(!checked) {
      setCategoryFiltersType((prev) => {
        const next = new Set(prev);
        next.delete(filter);
        setCurrentPage(1);
        return next;
      });
    }
  };

  const handleFilterChangeLevel = (checked: boolean, filter: string) => {
    if(checked) {
      setCategoriesFiltersLevel((prev) => new Set(prev).add(filter));
      setCurrentPage(1);
    }
    if(!checked) {
      setCategoriesFiltersLevel((prev) => {
        const next = new Set(prev);
        next.delete(filter);
        setCurrentPage(1);
        return next;
      });
    }
  };

  if(!sortedCards){
    return;
  }

  const getFiltredCameras = (): TCameraArray => {
    let filtredCameras = sortedCards;
    filtredCameras = categoryFiltersType.size === 0 ? filtredCameras : filtredCameras.filter((item) => categoryFiltersType.has(item.type));
    filtredCameras = categoryFiltersLevel.size === 0 ? filtredCameras : filtredCameras.filter((item) => categoryFiltersLevel.has(item.level));
    switch(categoryFiltersCategory) {
      case FilterCategory.Fotocamera:
        return filtredCategory[FilterCategory.Fotocamera](filtredCameras);
      case FilterCategory.Videocamera:
        return filtredCategory[FilterCategory.Videocamera](filtredCameras);
    }
    return filtredCameras;
  };

  const handleResetClick = () => {
    setCategoryFiltersType(new Set());
    setCategoriesFiltersLevel(new Set());
    setCategoryFiltersCategory('');
  };

  const filtredAllCameras = getFiltredCameras();

  const currentCardPage = filtredAllCameras?.slice(firstCardIndex, lastCardIndex);

  if(!filtredAllCameras) {
    return (
      <>
      </>
    );
  }

  const countPages = Math.ceil(filtredAllCameras.length / CARD_ON_PAGE);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Фотошоп</title>
      </Helmet>
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
                  <Filters onChangeType={handleFilterChangeType} onChangeLevel={handleFilterChangeLevel} onChangeCategory={setCategoryFiltersCategory} onClickReset={handleResetClick} currentCategory={categoryFiltersCategory}/>
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
                    {isLoadingStatusRejected ? 'Нет подключение к серверу' : ''}
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
