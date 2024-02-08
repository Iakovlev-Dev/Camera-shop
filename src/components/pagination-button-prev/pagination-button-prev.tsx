import { TEventKey } from '../../pages/page-main/page-main';

type TButtonPagination = {
    button: 'prev' | 'next';
    onClick: () => void;
    onKeyDown: (evt: TEventKey) => void;

}

export default function ButtonPagination ({button, onClick, onKeyDown}: TButtonPagination) {

  return (
    <li className="pagination__item">
      <a
        className="pagination__link pagination__link--text"
        onClick={() => {
          onClick();
        }}
        tabIndex={0}
        onKeyDown={(evt) => onKeyDown(evt)}
      >
        {button === 'next' ? 'Далее' : 'Назад'}
      </a>
    </li>
  );
}
