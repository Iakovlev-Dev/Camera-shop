import { ChangeEvent, useEffect, useState } from 'react';
import FilterByCategory from '../filter-by-category/filter-by-category';
import FilterByLevel from '../filter-by-level/filter-by-level';
import FilterByType from '../filter-by-type/filter-by-type';
import { useAppDispatch } from '../../store/hooks';
import { fetchCamerasByPriceAction, fetchCardsAction } from '../../store/api-action';
import { TCamera } from '../../types/type-camera';

type TFilters = {
    onChangeType: (evt: boolean, filter: string)=> void;
    onChangeLevel: (evt: boolean, filter: string) => void;
    onChangeCategory: (filter: string) => void;
    onClickReset: () => void;
    currentCategory: string;
    min: TCamera;
    max: TCamera;
}

export default function Filters ({onChangeType, onChangeLevel, onClickReset, onChangeCategory, currentCategory, min, max}: TFilters) {
  const dispatch = useAppDispatch();

  const [priceFrom, setPriceFrom] = useState(min.price.toString());
  const [priceTo, setPriceTo] = useState(max.price.toString());

  console.log(max.price.toString());

  useEffect(() => {
    if(priceFrom && priceTo) {
      dispatch(fetchCamerasByPriceAction(`price_gte=${priceFrom}&price_lte=${priceTo}`));
    }
  }, [dispatch, priceFrom, priceTo]);

  const setValueInputFrom = (obj: TCamera, str: string): string => {
    if(Number(str) < 0) {
      return obj.price.toString();
    }
    if(Number(str) < obj.price) {
      return obj.price.toString();
    }
    return str;
  };

  const setValueInputTo = (obj: TCamera, str: string): string => {
    if(Number(str) < 0) {
      return obj.price.toString();
    }
    if(Number(str) > obj.price) {
      return obj.price.toString();
    }
    return str;
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, cb: (arg0: string) => void) => {
    if(Number(evt.target.value) < min.price) {
      cb(min.price.toString());
    }
    cb(evt.target.value);
  };
  const reset = () => {
    onClickReset();
    setPriceFrom(min.price.toString());
    setPriceTo(max.price.toString());
    dispatch(fetchCardsAction());
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder="от"
                  value={setValueInputFrom(min, priceFrom)}
                  onChange={(evt) => handleChange(evt, setPriceFrom)}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder="до"
                  value={setValueInputTo(max, priceTo)}
                  onChange={(evt) => (handleChange(evt, setPriceTo))}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <FilterByCategory onChange={onChangeCategory} currentCategory={currentCategory}/>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <FilterByType onChange={onChangeType} currentCategory={currentCategory}/>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <FilterByLevel onChange={onChangeLevel}/>
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
