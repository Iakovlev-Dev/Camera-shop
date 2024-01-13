import { useState } from 'react';
import ButtonPagination from '../pagination-button-prev/pagination-button-prev';
import PaginationPage from '../pagination-page/pagination-page';

type TPagination = {
    count: number;
    currentPage: number;
    setPage: (arg: number) => void;
}

const MAX_PAGES = 3;

export default function Pagination ({count, currentPage, setPage}: TPagination) {
  const pagesArray = Array.from({length: count}, (_v, k: number) => k + 1);
  const [firstPageIndex, setFirstPageIndex] = useState(0);
  const [lastPageIndex, setLastPageIndex] = useState(3);
  const pagesSlice = pagesArray.slice(firstPageIndex, lastPageIndex);

  const clickNextButton = () => {
    setFirstPageIndex(firstPageIndex + MAX_PAGES);
    setLastPageIndex(lastPageIndex + MAX_PAGES);
    setPage(firstPageIndex + MAX_PAGES + 1);
  };

  const clickPrevButton = () => {
    setPage(firstPageIndex) ;
    setFirstPageIndex(firstPageIndex - MAX_PAGES);
    setLastPageIndex(lastPageIndex - MAX_PAGES);
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > MAX_PAGES ? <ButtonPagination button="prev" onClick={clickPrevButton} /> : ''}
        {pagesSlice.map((item) => (
          <PaginationPage
            page={item}
            currentPage={currentPage}
            setPage={setPage}
            key={item}
          />))}
        {(pagesArray[pagesArray.length - 1] > pagesSlice[pagesSlice.length - 1]) ? <ButtonPagination button="next" onClick={clickNextButton} /> : ''}
      </ul>
    </div>
  );
}
