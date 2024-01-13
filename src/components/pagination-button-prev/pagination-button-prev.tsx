type TButtonPagination = {
    button: 'prev' | 'next';
}

export default function ButtonPagination ({button}: TButtonPagination) {
  return (
    <li className="pagination__item">
      <a
        className="pagination__link pagination__link--text"
      >
        {button === 'next' ? 'Далее' : 'Назад'}
      </a>
    </li>
  );
}
