import { SortBtnRus, SortBy } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectActiveSortBtn, selectActiveSortBy } from '../../store/sorting-process/selectors';
import { setActiveSortBtn, setActiveSortBy } from '../../store/sorting-process/sorting-process';

export default function SortingBtn () {
  const dispatch = useAppDispatch();
  const sortBtn = useAppSelector(selectActiveSortBtn);
  const sortBy = useAppSelector(selectActiveSortBy);
  const handleClickSort = (sort: string) => {
    dispatch(setActiveSortBtn(sort));
    if(!sortBy) {
      dispatch(setActiveSortBy(SortBy.sortPrice));
    }
  };
  return (
    <>
      {Object.keys(SortBtnRus).map((item) => (
        <div className={`catalog-sort__btn catalog-sort__btn--${item}`} key={item} data-testid='sorting-btn'>
          <input
            type="radio"
            id={item}
            name="sort-icon"
            aria-label={SortBtnRus[item]}
            onChange={() => handleClickSort(item)}
            checked={sortBtn === item}
            tabIndex={0}
          />
          <label htmlFor={item}>
            <svg width={16} height={14} aria-hidden="true">
              <use xlinkHref="#icon-sort" />
            </svg>
          </label>
        </div>
      ))}
    </>
  );
}
