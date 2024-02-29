import Header from '../../components/header/header';
import Sorting from '../../components/sorting/sorting';
import SortingBtn from '../../components/sorting-btn/sorting-btn';
import Footer from '../../components/footer/footer';
import Card from '../../components/card/card';
import { useAppSelector } from '../../store/hooks';
import { selectLoadingStatus, selectLoadingStatusRejected } from '../../store/data-card-process/selectors';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { useEffect, useState } from 'react';
import PopupAddCameras from '../../components/popup-add-camera/popup-add-camera';
import { Helmet } from 'react-helmet-async';
import { CARD_ON_PAGE } from '../../const';
import { selectActiveSortBtn, selectActiveSortBy } from '../../store/sorting-process/selectors';
import { sortingBy } from '../../utils';
import Filters from '../../components/filters/filters';
import { selectCurrentCategory, selectCurrentLevel, selectCurrentType, selectFiltredCameras } from '../../store/filter-process/selectors';
import { TCamera, TCameraArray } from '../../types/type-camera';
import Loader from '../../components/loader/loader';

export type TEventKey = {
  key: string;
  preventDefault: () => void;
}

export default function PageMain () {
  const sortBtn = useAppSelector(selectActiveSortBtn);
  const sortBy = useAppSelector(selectActiveSortBy);
  const cards = useAppSelector(selectFiltredCameras);
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

  const currentCategory = useAppSelector(selectCurrentCategory);
  const currentTypes = useAppSelector(selectCurrentType);
  const currentLevel = useAppSelector(selectCurrentLevel);

  const getFiltredCameras = (): TCameraArray | undefined => {
    let filtredCameras = sortedCards;
    if(filtredCameras){
      filtredCameras = currentCategory.length === 0 ? filtredCameras : filtredCameras.filter((camera: TCamera) => currentCategory.includes(camera.category));
      filtredCameras = currentTypes.length === 0 ? filtredCameras : filtredCameras.filter((camera: TCamera) => currentTypes.includes(camera.type));
      filtredCameras = currentLevel.length === 0 ? filtredCameras : filtredCameras.filter((camera: TCamera) => currentLevel.includes(camera.level));
      return filtredCameras;
    }
  };
  const filtredAllCameras = getFiltredCameras();

  const currentCardPage = filtredAllCameras?.slice(firstCardIndex, lastCardIndex);

  let countPages;
  if(filtredAllCameras) {
    countPages = Math.ceil(filtredAllCameras?.length / CARD_ON_PAGE);
  } else {
    countPages = 0;
  }

  const isLoadingData = useAppSelector(selectLoadingStatus);
  if(isLoadingData) {
    document.body.classList.add('scroll-lock');
  } else {
    document.body.classList.remove('scroll-lock');
  }

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
                  <Filters cards={filtredAllCameras || []} setPage={setCurrentPage}/>
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
                  {isLoadingData ? <Loader /> : ''}
                  <div className="cards catalog__cards">
                    {isLoadingStatusRejected ? 'Нет подключение к серверу' : ''}
                    {currentCardPage === undefined || filtredAllCameras?.length === 0 && !isLoadingStatusRejected && !isLoadingData ? 'По вашему запросу ничего не найдено' :
                      currentCardPage.map((item) =>
                        (
                          <Card
                            key={item.id}
                            card={item}
                            onClick={() => handleOpenModal()}
                          />))}
                  </div>
                  <Pagination count={countPages} currentPage={currentPage} setPage={paginate} />
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
