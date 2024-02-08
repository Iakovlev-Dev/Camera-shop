import { useEffect, useState } from 'react';
import ButtonPagination from '../pagination-button-prev/pagination-button-prev';
import PaginationPage from '../pagination-page/pagination-page';
import { useSearchParams } from 'react-router-dom';
import { MAX_PAGES } from '../../const';
import { TEventKey } from '../../pages/page-main/page-main';


type TPagination = {
    count: number;
    currentPage: number;
    setPage: (arg: number) => void;
}

export default function Pagination ({count, currentPage, setPage}: TPagination) {
  const pagesArray = Array.from({length: count}, (_v, k: number) => k + 1);
  const [firstPageIndex, setFirstPageIndex] = useState(0);
  const [lastPageIndex, setLastPageIndex] = useState(3);
  const pagesSlice = pagesArray.slice(firstPageIndex, lastPageIndex);

  const [ , setSearchParams] = useSearchParams();


  useEffect(() => {
    setSearchParams({page: (currentPage).toString()});
  }, [currentPage, setSearchParams]);

  const clickNextButton = () => {
    setPage(lastPageIndex + 1);
    setFirstPageIndex(firstPageIndex + MAX_PAGES);
    setLastPageIndex(lastPageIndex + MAX_PAGES);
  };

  const clickPrevButton = () => {
    setPage(firstPageIndex);
    setFirstPageIndex(firstPageIndex - MAX_PAGES);
    setLastPageIndex(lastPageIndex - MAX_PAGES);
  };

  const handleKeyEnterNext = (evt: TEventKey) => {
    const handleKeyDown = () => {
      if(evt.key === ' ' || evt.key === 'Enter') {
        clickNextButton();
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  };

  const handleKeyEnterPrev = (evt: TEventKey) => {
    const handleKeyDown = () => {
      if(evt.key === ' ' || evt.key === 'Enter') {
        clickPrevButton();
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  };

  return (
    <div className="pagination" data-testid='pagination'>
      <ul className="pagination__list">
        {lastPageIndex > MAX_PAGES ? <ButtonPagination button="prev" onClick={clickPrevButton} onKeyDown={handleKeyEnterPrev}/> : ''}
        {pagesSlice.map((item) => (
          <PaginationPage
            page={item}
            currentPage={currentPage}
            onClick={setPage}
            key={item}
          />))}
        {lastPageIndex < pagesArray.length ? <ButtonPagination button="next" onClick={clickNextButton} onKeyDown={handleKeyEnterNext}/> : ''}
      </ul>
    </div>
  );
}
