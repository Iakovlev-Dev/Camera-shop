import { ChangeEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMaxPrice, selectMinAndMaxPrice, selectMinPrice } from '../../store/filter-process/selectors';
import { setMaxPrice, setMinPrice } from '../../store/filter-process/filter-process';
import { fetchCamerasByPriceAction } from '../../store/api-action';
import { TCameraArray } from '../../types/type-camera';
import { useSearchParams } from 'react-router-dom';
type TFilterPrice = {
  cameras: TCameraArray;
}
export default function FilterByPrice ({cameras}: TFilterPrice) {
  const dispatch = useAppDispatch();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const params = Object.fromEntries(searchParams);

  const inputMinRef = useRef<HTMLInputElement | null>(null);
  const inputMaxRef = useRef<HTMLInputElement | null>(null);
  const minPriceValue = useAppSelector(selectMinPrice);
  const maxPriceValue = useAppSelector(selectMaxPrice);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const [minPrice, maxPrice] = useAppSelector(selectMinAndMaxPrice);

  const sortedCameras = cameras.sort((a, b) => a.price - b.price);
  const min = sortedCameras.at(0)?.price;
  const max = sortedCameras.at(-1)?.price;

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
      if(max && inputMinRef.current && inputValue > max) {
        inputMinRef.current.value = max.toString();
      }
      setSearchParams({
        ...params,
        minPrice: inputMinRef.current.value.toString()
      });
      dispatch(setMinPrice(evt.target.value));
    }
  };

  const handleChangeMaxValue = (evt: ChangeEvent<HTMLInputElement>) => {
    if(maxPrice && minPrice && inputMaxRef.current && max) {
      let inputValue = Number(evt.target.value);
      if(inputMaxRef.current && inputValue > maxPrice) {
        inputMaxRef.current.value = maxPrice.toString();
        inputValue = maxPrice;
      }
      if(inputMaxRef.current && min && inputValue < min) {
        inputValue = max;
        inputMaxRef.current.value = max.toString();
      }
      if(inputValue === Number(maxPriceValue)) {
        inputMaxRef.current.value = max.toString();
      }
      setSearchParams({
        ...params,
        maxPrice: inputMaxRef.current.value.toString()
      });
      dispatch(setMaxPrice(evt.target.value));
    }
  };

  useEffect(() => {
    if(inputMaxRef.current && max) {
      inputMaxRef.current.value = max.toString();
    }
  }, [max]);

  useEffect(() => {
    if(inputMinRef.current && min) {
      inputMinRef.current.value = min.toString();
    }
  }, [min]);

  return (
    <div className="catalog-filter__price-range">
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="price"
            placeholder={min?.toString()}
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
            placeholder={max?.toString()}
            ref={inputMaxRef}
            onBlur={handleChangeMaxValue}
          />
        </label>
      </div>
    </div>
  );
}
