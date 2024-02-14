import { FilterLevelRus } from '../../const';

type TFilterByLevel = {
  onChange: (evt: boolean, filter: string) => void;
}

export default function FilterByLevel ({onChange}: TFilterByLevel) {

  return (
    <>
      {Object.keys(FilterLevelRus).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item} data-testid='filter-level'>
          <label>
            <input
              type="checkbox"
              name={item}
              onChange={(evt) => onChange(evt.target.checked, FilterLevelRus[item])}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{FilterLevelRus[item]}</span>
          </label>
        </div>
      ))}
    </>
  );
}
