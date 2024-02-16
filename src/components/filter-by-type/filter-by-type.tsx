import { FilterCategory, FilterType, FilterTypeRus } from '../../const';

type TFilterByType = {
  onChange: (evt: boolean, filter: string) => void;
  currentCategory: string;
}

export default function FilterByType ({onChange, currentCategory}: TFilterByType) {


  const disabledItem = (active: string, current: string) => {
    if(active === FilterCategory.Fotocamera || !active) {
      return false;
    } else {
      if (current === FilterType.Instant || current === FilterType.FilmCamera) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <>
      {Object.keys(FilterTypeRus).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item} data-testid='filter-type'>
          <label>
            <input
              type="checkbox"
              name={item}
              disabled = {disabledItem(currentCategory, item)}
              onChange={(evt) => onChange(evt.target.checked, FilterTypeRus[item])}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{FilterTypeRus[item]}</span>
          </label>
        </div>
      ))}
    </>
  );
}
