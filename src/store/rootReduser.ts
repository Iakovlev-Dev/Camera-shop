import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataCardsProcess } from './data-card-process/data-card-process';
import { reviewProcess } from './reviews-process/review-process';
import { promoProcess } from './promo-process/promo-process';


export const rootReducer = combineReducers({
  [NameSpace.DATA_CARDS]: dataCardsProcess.reducer,
  [NameSpace.REVIEW]: reviewProcess.reducer,
  [NameSpace.PROMO]: promoProcess.reducer,
});
