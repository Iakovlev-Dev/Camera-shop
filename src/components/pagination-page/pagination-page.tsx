
type TPaginationPage = {
    page: number;
    currentPage: number;
    onClick: (arg: number) => void;
}

export default function PaginationPage ({page, currentPage, onClick}: TPaginationPage) {

  const handleClickPage = (pageNumber: number) => {
    onClick(pageNumber);
  };


  return (
    <li className="pagination__item">
      <a
        className={currentPage === page ? 'pagination__link pagination__link--active' : 'pagination__link'}
        onClick={() => handleClickPage(page)}
        tabIndex={0}
      >
        {page}
      </a>
    </li>
  );
}
