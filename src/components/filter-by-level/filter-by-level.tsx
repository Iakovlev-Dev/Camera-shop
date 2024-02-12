import { FilterLevelRus } from '../../const';
import { setFilterLevel } from '../../store/filter-process/filter-process';
import { useAppDispatch } from '../../store/hooks';

export default function FilterByLevel () {
  const dispatch = useAppDispatch();
  return (
    <>
      {Object.keys(FilterLevelRus).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item} data-testid='filter-level'>
          <label>
            <input
              type="checkbox"
              name={item}
              onClick={() => dispatch(setFilterLevel(item))}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{FilterLevelRus[item]}</span>
          </label>
        </div>
      ))}
    </>
  );
}
