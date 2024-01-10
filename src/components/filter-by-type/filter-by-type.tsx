import { FilterType } from '../../const';

export default function FilterByType () {
  return (
    <>
      {Object.keys(FilterType).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item}>
          <label>
            <input
              type="checkbox"
              name="digital"
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{FilterType[item]}</span>
          </label>
        </div>
      ))}
    </>
  );
}
