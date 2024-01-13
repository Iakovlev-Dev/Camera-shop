
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
        <li className="pagination__item">
          <a
            className="pagination__link pagination__link--text"
          >
            Назад
          </a>
        </li>
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
        <li className="pagination__item">
          <a
            className="pagination__link pagination__link--text"
          >
            Далее
          </a>
        </li>
      </ul>
    </div>
  );
}
