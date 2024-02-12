import { FilterCategory, FilterType, FilterTypeRus } from '../../const';
import { setFilterType } from '../../store/filter-process/filter-process';
import { selectFilterCategory } from '../../store/filter-process/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function FilterByType () {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectFilterCategory);
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
              name="digital"
              disabled = {disabledItem(activeCategory, item)}
              onClick={() => dispatch(setFilterType(item))}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{FilterTypeRus[item]}</span>
          </label>
        </div>
      ))}
    </>
  );
}
