import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

type TInitialStateFilters = {
    filterCategory: string;
    filterType: string;
    filterLevel: string;
}

const initialState: TInitialStateFilters = {
  filterCategory: '',
  filterType: '',
  filterLevel: '',
};

export const filterProcess = createSlice({
  name: NameSpace.FILTERS,
  initialState,
  reducers: {
    setFilterCategory(state, action: PayloadAction<string>) {
      state.filterCategory = action.payload;
    },
    setFilterType(state, action: PayloadAction<string>) {
      state.filterType = action.payload;
    },
    setFilterLevel(state, action: PayloadAction<string>) {
      state.filterLevel = action.payload;
    }
  }
});

export const { setFilterCategory, setFilterType, setFilterLevel } = filterProcess.actions;
