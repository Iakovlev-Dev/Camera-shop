import { SortBtn } from '../../const';

export default function SortingBtn () {
  return (
    <>
      {Object.keys(SortBtn).map((item) => (
        <div className={`catalog-sort__btn catalog-sort__btn--${item}`} key={item}>
          <input
            type="radio"
            id={item}
            name="sort-icon"
            defaultChecked = {item === 'up'}
            aria-label={SortBtn[item]}
          />
          <label htmlFor={item}>
            <svg width={16} height={14} aria-hidden="true">
              <use xlinkHref="#icon-sort" />
            </svg>
          </label>
        </div>
      ))}
    </>
  );
}
