import { ChangeEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMaxPrice, selectMinAndMaxPrice, selectMinAndMaxPriceFiltered, selectMinPrice } from '../../store/filter-process/selectors';
import { setMaxPrice, setMinPrice } from '../../store/filter-process/filter-process';
import { fetchCamerasByPriceAction } from '../../store/api-action';

export default function FilterByPrice () {
  const dispatch = useAppDispatch();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const params = Object.fromEntries(searchParams);

  const inputMinRef = useRef<HTMLInputElement | null>(null);
  const inputMaxRef = useRef<HTMLInputElement | null>(null);
  const minPriceValue = useAppSelector(selectMinPrice);
  const maxPriceValue = useAppSelector(selectMaxPrice);

  const [minPrice, maxPrice] = useAppSelector(selectMinAndMaxPrice);
  const [minPriceFilter, maxPriceFilter] = useAppSelector(selectMinAndMaxPriceFiltered);

  useEffect(() => {
    dispatch(setMinPrice(minPrice?.toString() || ''));
    dispatch(setMaxPrice(maxPrice?.toString() || ''));
  }, [dispatch, maxPrice, minPrice]);

  useEffect(() => {
    dispatch(fetchCamerasByPriceAction(`price_gte=${minPriceValue.toString() || '0'}&price_lte=${maxPriceValue.toString() || maxPrice?.toString() || ''}`));
  }, [dispatch, maxPrice, maxPriceValue, minPriceValue]);


  const handleChangeMinValue = (evt: ChangeEvent<HTMLInputElement>) => {
    if(minPrice && inputMinRef.current) {
      let inputValue = Number(evt.target.value);
      if(inputMinRef.current && inputValue <= 0 || inputMinRef.current && inputValue < minPrice) {
        inputMinRef.current.value = minPrice.toString();
        inputValue = minPrice;
      }
      if(maxPriceFilter && inputMinRef.current && inputValue > maxPriceFilter) {
        inputMinRef.current.value = maxPriceFilter.toString();
      }
      dispatch(setMinPrice(evt.target.value));
    }
  };

  const handleChangeMaxValue = (evt: ChangeEvent<HTMLInputElement>) => {
    if(maxPrice && minPrice && inputMaxRef.current && maxPriceFilter) {
      let inputValue = Number(evt.target.value);
      if(inputMaxRef.current && inputValue > maxPrice) {
        inputMaxRef.current.value = maxPrice.toString();
        inputValue = maxPrice;
      }
      if(inputMaxRef.current && minPriceFilter && inputValue < minPriceFilter) {
        inputValue = maxPriceFilter;
        inputMaxRef.current.value = maxPriceFilter.toString();
      }
      if(inputValue === Number(maxPriceValue)) {
        inputMaxRef.current.value = maxPriceFilter.toString();
      }
      dispatch(setMaxPrice(evt.target.value));
    }
  };


  useEffect(() => {
    if(inputMaxRef.current && maxPriceFilter) {
      inputMaxRef.current.value = maxPriceFilter.toString();
    }
  }, [maxPriceFilter]);

  useEffect(() => {
    if(inputMinRef.current && minPriceFilter) {
      inputMinRef.current.value = minPriceFilter.toString();
    }
  }, [minPriceFilter]);

  return (
    <div className="catalog-filter__price-range">
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="price"
            ref={inputMinRef}
            onBlur={handleChangeMinValue}
          />
        </label>
      </div>
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="priceUp"
            ref={inputMaxRef}
            onBlur={handleChangeMaxValue}
          />
        </label>
      </div>
    </div>
  );
}
