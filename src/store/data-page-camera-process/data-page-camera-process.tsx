import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchSimilarProductsAction } from '../api-action';
import { TSimilarProductArray } from '../../types/type-similar-product';

type TinitialStatePageCamera = {
    similarCameras: TSimilarProductArray;
}

const initialState: TinitialStatePageCamera = {
  similarCameras: []
};


export const pageCameraProcess = createSlice({
  name: NameSpace.PAGE_CAMERA,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      });
  },
});
