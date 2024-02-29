
import { useSearchParams } from 'react-router-dom';
import { TEventKey } from '../../pages/page-main/page-main';

type TPaginationPage = {
    page: number;
    currentPage: number;
    onClick: (arg: number) => void;
}

export default function PaginationPage ({page, currentPage, onClick}: TPaginationPage) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const handleClickPage = (pageNumber: number) => {
    onClick(pageNumber);
    setSearchParams({
      ...params,
      page: (pageNumber).toString()
    });
  };
  const handleKeyEnter = (pageNumber: number) => {
    if(pageNumber === currentPage) {
      return;
    }

    const handleKeyDown = (evt: TEventKey) => {
      if(evt.key === 'Enter' || evt.key === ' ') {
        document.removeEventListener('keydown', handleKeyDown);
        onClick(pageNumber);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

  };


  return (
    <li className="pagination__item">
      <a
        className={currentPage === page ? 'pagination__link pagination__link--active' : 'pagination__link'}
        onClick={() => handleClickPage(page)}
        onKeyDown={() => handleKeyEnter(page)}
        tabIndex={0}
      >
        {page}
      </a>
    </li>
  );
}
