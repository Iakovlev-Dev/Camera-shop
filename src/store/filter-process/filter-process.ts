import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCameraArray } from '../../types/type-camera';
import { fetchCamerasByPriceAction } from '../api-action';

type TInitialStateFilter = {
    currentFilterCategory: string;
    currentFilterType: string[];
    currentFilterLevel: string[];
    minPrice: string;
    maxPrice: string;
    filtredCameras: TCameraArray;
}

const initialState: TInitialStateFilter = {
  currentFilterCategory: '',
  currentFilterType: [],
  currentFilterLevel: [],
  minPrice: '',
  maxPrice: '',
  filtredCameras: []
};

export const filterProcess = createSlice({
  name: NameSpace.FILTERS,
  initialState,
  reducers: {
    setCurrentCategory(state, action: PayloadAction<string>) {
      state.currentFilterCategory = action.payload;
    },
    setCurrentType(state, action: PayloadAction<string[]>) {
      state.currentFilterType = action.payload;
    },
    setCurrentLevel(state, action: PayloadAction<string[]>) {
      state.currentFilterLevel = action.payload;
    },
    setMinPrice(state, action: PayloadAction<string>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<string>) {
      state.maxPrice = action.payload;
    },
    setFiltredCameras(state, action: PayloadAction<TCameraArray>) {
      state.filtredCameras = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasByPriceAction.fulfilled, (state, action) => {
        state.filtredCameras = action.payload;
      });
  },
}
);

export const {setCurrentCategory, setCurrentType, setCurrentLevel, setMinPrice, setMaxPrice, setFiltredCameras} = filterProcess.actions;
