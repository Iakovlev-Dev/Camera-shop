import { FilterType, FilterTypeRus, categorysFilter } from '../../const';
import { selectCurrentCategory, selectCurrentType } from '../../store/filter-process/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentType } from '../../store/filter-process/filter-process';
import { useSearchParams } from 'react-router-dom';


export default function FilterByType () {
  const dispatch = useAppDispatch();
  const currentTypes = useAppSelector(selectCurrentType);
  const currentCategory = useAppSelector(selectCurrentCategory);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const disabledItem = (active: string, current: string) => {
    if(active === categorysFilter.Fotocamera || !active) {
      return false;
    } else {
      if (current === FilterType.Instant || current === FilterType.FilmCamera) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handlerChangeType = (type: string) => {
    const checkedTypes = [...currentTypes];
    const typeIndex = currentTypes.indexOf(FilterTypeRus[type]);
    if(typeIndex === -1) {
      checkedTypes.push(FilterTypeRus[type]);
    } else {
      checkedTypes.splice(typeIndex, 1);
    }
    setSearchParams({
      ...params,
      types: checkedTypes.join('-')
    });
    dispatch(setCurrentType(checkedTypes));
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
              onChange={() => handlerChangeType(item)}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{FilterTypeRus[item]}</span>
          </label>
        </div>
      ))}
    </>
  );
}
