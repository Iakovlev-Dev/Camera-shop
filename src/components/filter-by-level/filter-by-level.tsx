import { FilterLevel } from '../../const';

export default function FilterByLevel () {
  return (
    <>
      {Object.keys(FilterLevel).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item} data-testid='filter-level'>
          <label>
            <input type="checkbox" name="zero"/>
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{FilterLevel[item]}</span>
          </label>
        </div>
      ))}
    </>
  );
}
