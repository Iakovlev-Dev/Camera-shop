import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TState } from '../../types/type-store';
import { selectCards } from '../data-card-process/selectors';

export const selectCurrentCategory = (state: TState) => state[NameSpace.FILTERS].currentFilterCategory;
export const selectCurrentType = (state: TState) => state[NameSpace.FILTERS].currentFilterType;
export const selectCurrentLevel = (state: TState) => state[NameSpace.FILTERS].currentFilterLevel;
export const selectMinPrice = (state: TState) => state[NameSpace.FILTERS].minPrice;
export const selectMaxPrice = (state: TState) => state[NameSpace.FILTERS].maxPrice;
export const selectFiltredCameras = (state: TState) => state[NameSpace.FILTERS].filtredCameras;

export const selectMinAndMaxPrice = createSelector([selectCards], (cards) => {
  const sortedCameras = [...cards].sort((a, b) => a.price - b.price);
  const minPrice = sortedCameras.at(0)?.price;
  const maxPrice = sortedCameras.at(-1)?.price;

  return [minPrice, maxPrice];
});
