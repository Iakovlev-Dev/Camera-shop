import ButtonPagination from '../pagination-button-prev/pagination-button-prev';

type TPagination = {
    count: number;
    currentPage: number;
    setPage: (arg: number) => void;
}

export default function Pagination ({count, currentPage, setPage}: TPagination) {
  const pagesArray = Array.from({length: count}, (_v, k: number) => k + 1);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <ButtonPagination button="prev"/>
        {pagesArray.map((item) => (
          <li className="pagination__item" key={item}>
            <a
              className={currentPage === item ? 'pagination__link pagination__link--active' : 'pagination__link'}
              onClick={() => setPage(item)}
            >
              {item}
            </a>
          </li>
        ))}
        <ButtonPagination button="next"/>
      </ul>
    </div>
  );
}
