import { TEventKey } from '../../pages/page-main/page-main';

type TButtonPagination = {
    button: 'prev' | 'next';
    onClick: () => void;

}

export default function ButtonPagination ({button, onClick, }: TButtonPagination) {

  const handleKeyEnter = () => {
    const handleKeyDown = (evt: TEventKey) => {
      if(evt.key === ' ' || evt.key === 'Enter') {
        onClick();
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  };

  return (
    <li className="pagination__item">
      <a
        className="pagination__link pagination__link--text"
        onClick={() => {
          onClick();
        }}
        tabIndex={0}
        onKeyDown={() => handleKeyEnter()}
      >
        {button === 'next' ? 'Далее' : 'Назад'}
      </a>
    </li>
  );
}
