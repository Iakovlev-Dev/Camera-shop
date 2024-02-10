import { useSearchParams } from 'react-router-dom';
import { SortBtn, SortBy, SortByRus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectActiveSortBtn, selectActiveSortBy } from '../../store/sorting-process/selectors';
import { setActiveSortBtn, setActiveSortBy } from '../../store/sorting-process/sorting-process';

export default function Sorting () {
  const dispatch = useAppDispatch();
  const sortBtn = useAppSelector(selectActiveSortBtn);
  const sortBy = useAppSelector(selectActiveSortBy);
  const [ searchParams, ] = useSearchParams();


  const handleClickSort = (sort: string) => {
    searchParams.set(sort, sort);

    dispatch(setActiveSortBy(sort));
    if(!sortBtn) {
      dispatch(setActiveSortBtn(SortBtn.up));
    }
  };

  return (
    <>
      {Object.keys(SortBy).map((item) => (
        <div className="catalog-sort__btn-text" key={item} data-testid='sorting-item'>
          <input
            type="radio"
            id={item}
            name="sort"
            onChange={() => handleClickSort(item)}
            checked={item === sortBy}
          />
          <label htmlFor={item}>{SortByRus[item]}</label>
        </div>
      ))}
    </>
  );
}
