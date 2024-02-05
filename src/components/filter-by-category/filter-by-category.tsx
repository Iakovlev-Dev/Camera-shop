import { FilterCategory } from '../../const';

export default function FilterByCategory () {
  return (
    <>
      {Object.keys(FilterCategory).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item} data-testid='filter-item'>
          <label>
            <input
              type="checkbox"
              name={item}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">
              {FilterCategory[item]}
            </span>
          </label>
        </div>
      ))}
    </>


  );
}
