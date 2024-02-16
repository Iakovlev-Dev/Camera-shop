import { FilterCategoryRus } from '../../const';

type TFilterByCategory = {
  onChange: (filter: string) => void;
  currentCategory: string;
}
export default function FilterByCategory ({onChange, currentCategory}: TFilterByCategory) {

  return (
    <>
      {Object.keys(FilterCategoryRus).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item} data-testid='filter-item'>
          <label>
            <input
              type="checkbox"
              name={item}
              onChange={() => onChange(item)}
              checked = {item === currentCategory}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">
              {FilterCategoryRus[item]}
            </span>
          </label>
        </div>
      ))}
    </>


  );
}
