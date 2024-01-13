
type TButtonPagination = {
    button: 'prev' | 'next';
    onClick: () => void;
}

export default function ButtonPagination ({button, onClick}: TButtonPagination) {
  return (
    <li className="pagination__item">
      <a
        className="pagination__link pagination__link--text"
        onClick={() => {
          onClick();
        }}
      >
        {button === 'next' ? 'Далее' : 'Назад'}
      </a>
    </li>
  );
}
