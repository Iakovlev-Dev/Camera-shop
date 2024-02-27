import { FilterLevelRus } from '../../const';
import { setCurrentLevel } from '../../store/filter-process/filter-process';
import { selectCurrentLevel } from '../../store/filter-process/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function FilterByLevel () {
  const dispatch = useAppDispatch();
  const currentLevel = useAppSelector(selectCurrentLevel);

  const handleChangeLevel = (level: string) => {
    const checkedLevel = [...currentLevel];
    const indexLevel = currentLevel.indexOf(level);
    if(indexLevel === -1) {
      checkedLevel.push(level);
    } else {
      checkedLevel.splice(indexLevel, 1);
    }
    dispatch(setCurrentLevel(checkedLevel));
  };

  return (
    <>
      {Object.keys(FilterLevelRus).map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item} data-testid='filter-level'>
          <label>
            <input
              type="checkbox"
              name={item}
              onChange={() => handleChangeLevel(FilterLevelRus[item])}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{FilterLevelRus[item]}</span>
          </label>
        </div>
      ))}
    </>
  );
}
