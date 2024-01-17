import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataCardsProcess } from './data-card-process/data-card-process';
// import { pageCameraProcess } from './data-page-camera-process/data-page-camera-process';

export const rootReducer = combineReducers({
  [NameSpace.DATA_CARDS]: dataCardsProcess.reducer,
  // [NameSpace.PAGE_CAMERA]: pageCameraProcess.reducer,
});
