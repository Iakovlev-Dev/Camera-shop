import { SortBy } from '../../const';

export default function Sorting () {
  return (
    <>
      {Object.keys(SortBy).map((item) => (
        <div className="catalog-sort__btn-text" key={item}>
          <input
            type="radio"
            id={item}
            name="sort"
            checked = {item === 'sortPrice'}
          />
          <label htmlFor={item}>{SortBy[item]}</label>
        </div>
      ))}
    </>
  );
}
