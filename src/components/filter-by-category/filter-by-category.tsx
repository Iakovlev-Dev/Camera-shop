import { useSearchParams } from 'react-router-dom';
import { FilterCategoryRus, categorysFilter } from '../../const';
import { setCurrentCategory } from '../../store/filter-process/filter-process';
import { selectCurrentCategory } from '../../store/filter-process/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function FilterByCategory () {
  const dispach = useAppDispatch();
  const currentCategory = useAppSelector(selectCurrentCategory);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const handleChangeCategory = (category: string) => {
    if(category === 'Фотокамера') {
      dispach(setCurrentCategory('Фотоаппарат'));
      setSearchParams({
        ...params,
        cat: 'Фотоаппарат'});
    } else {
      dispach(setCurrentCategory(category));
      setSearchParams({
        ...params,
        cat: category});
    }
  };

  return (
    <>
      {Object.keys(FilterCategoryRus).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item} data-testid='filter-item'>
          <label>
            <input
              type="checkbox"
              name={item}
              checked = {categorysFilter[item] === currentCategory}
              onChange={() => handleChangeCategory(FilterCategoryRus[item])}
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
