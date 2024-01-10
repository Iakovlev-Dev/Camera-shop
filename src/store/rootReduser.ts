import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataCardsProcess } from './data-card-process/data-card-process';

export const rootReducer = combineReducers({
  [NameSpace.DATA_CARDS]: dataCardsProcess.reducer
});
