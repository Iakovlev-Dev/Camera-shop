import { SortBy } from '../../const';

export default function Sorting () {
  return (
    <>
      {Object.keys(SortBy).map((item) => (
        <div className="catalog-sort__btn-text" key={item} data-testid='sorting-item'>
          <input
            type="radio"
            id={item}
            name="sort"
            defaultChecked={item === 'sortPrice'}
          />
          <label htmlFor={item}>{SortBy[item]}</label>
        </div>
      ))}
    </>
  );
}
