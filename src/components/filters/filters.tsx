// import { useEffect } from 'react';
import { setCurrentCategory, setCurrentLevel, setCurrentType, setMaxPrice, setMinPrice } from '../../store/filter-process/filter-process';
import { selectMinAndMaxPrice } from '../../store/filter-process/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TCameraArray } from '../../types/type-camera';
import FilterByCategory from '../filter-by-category/filter-by-category';
import FilterByLevel from '../filter-by-level/filter-by-level';
import FilterByPrice from '../filter-by-price/filter-by-price';
import FilterByType from '../filter-by-type/filter-by-type';

type TFilters = {
  cards: TCameraArray;
  setPage: (arg: number) => void;
}

export default function Filters ({cards, setPage}: TFilters) {
  const dispatch = useAppDispatch();
  const [minPrice, maxPrice] = useAppSelector(selectMinAndMaxPrice);


  const reset = () => {
    dispatch(setCurrentCategory(''));
    dispatch(setCurrentType([]));
    dispatch(setCurrentLevel([]));
    dispatch(setMaxPrice(maxPrice?.toString() || ''));
    dispatch(setMinPrice(minPrice?.toString() || ''));
    setPage(1);
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <FilterByPrice cameras={cards}/>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <FilterByCategory />
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <FilterByType />
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <FilterByLevel />
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={() => reset()}
        >
                    Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
