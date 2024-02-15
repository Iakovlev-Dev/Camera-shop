import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

type TInitialStateFilters = {
    filterCategory: string;
}

const initialState: TInitialStateFilters = {
  filterCategory: '',
};

export const filterProcess = createSlice({
  name: NameSpace.FILTERS,
  initialState,
  reducers: {
    setFilterCategory(state, action: PayloadAction<string>) {
      state.filterCategory = action.payload;
    }
  }
});

export const { setFilterCategory } = filterProcess.actions;
