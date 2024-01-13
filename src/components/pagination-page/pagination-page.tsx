
type TPaginationPage = {
    page: number;
    currentPage: number;
    setPage: (arg: number) => void;
}

export default function PaginationPage ({page, currentPage, setPage}: TPaginationPage) {


  return (
    <li className="pagination__item">
      <a
        className={currentPage === page ? 'pagination__link pagination__link--active' : 'pagination__link'}
        onClick={() => setPage(page)}
      >
        {page}
      </a>
    </li>
  );
}
