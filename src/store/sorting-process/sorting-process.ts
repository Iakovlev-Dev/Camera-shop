import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

export type TInitialSorting = {
    activeSortBy: string;
    activeSortBtn: string;
}

const initialState: TInitialSorting = {
  activeSortBy: '',
  activeSortBtn: ''
};

export const sortingProcess = createSlice({
  name: NameSpace.SORTING,
  initialState,
  reducers: {
    setActiveSortBy(state, action: PayloadAction<string>){
      state.activeSortBy = action.payload;
    },
    setActiveSortBtn(state, action: PayloadAction<string>) {
      state.activeSortBtn = action.payload;
    }
  }
});

export const { setActiveSortBtn, setActiveSortBy } = sortingProcess.actions;
