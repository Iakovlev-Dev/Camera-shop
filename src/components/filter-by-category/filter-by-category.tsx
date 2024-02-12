import { FilterCategoryRus } from '../../const';
import { setFilterCategory } from '../../store/filter-process/filter-process';
import { selectFilterCategory } from '../../store/filter-process/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function FilterByCategory () {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectFilterCategory);

  return (
    <>
      {Object.keys(FilterCategoryRus).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item} data-testid='filter-item'>
          <label>
            <input
              type="checkbox"
              name={item}
              onChange={() => dispatch(setFilterCategory(item))}
              checked = {item === activeCategory}
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
