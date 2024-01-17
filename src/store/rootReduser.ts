import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataCardsProcess } from './data-card-process/data-card-process';
import { reviewProcess } from './reviews-process/review-process';


export const rootReducer = combineReducers({
  [NameSpace.DATA_CARDS]: dataCardsProcess.reducer,
  [NameSpace.REVIEW]: reviewProcess.reducer,
});
