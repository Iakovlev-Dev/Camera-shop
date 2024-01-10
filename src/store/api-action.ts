import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../types/type-store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCameraArray } from '../types/type-camera';
import { APIRoute } from '../const';


type TAPIAction = {
    dispatch: TAppDispatch;
    store: TState;
    extra: AxiosInstance;
}

export const fetchCardsAction = createAsyncThunk<TCameraArray, undefined, TAPIAction>('fetchCards',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TCameraArray>(APIRoute.Cameras);
    return data;
  }
);
