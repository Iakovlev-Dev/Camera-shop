import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../types/type-store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCamera, TCameraArray } from '../types/type-camera';
import { APIRoute } from '../const';
import { TPromoArray } from '../types/type-promo';
import { TSimilarProductArray } from '../types/type-similar-product';
import { TReviewsArray } from '../types/type-reviews';


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

export const fetchPromoAction = createAsyncThunk<TPromoArray, undefined, TAPIAction>('fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TPromoArray>(APIRoute.Promo);
    return data;
  }
);

export const fetchCardAction = createAsyncThunk<TCamera, number, TAPIAction>('fetchCard',
  async (id, {extra: api}) => {
    const {data} = await api.get<TCamera>(`${APIRoute.Cameras}/${id}`);
    return data;
  }
);
export const fetchSimilarProductsAction = createAsyncThunk<TSimilarProductArray, string, TAPIAction>('fetchSimilarProducts',
  async (id, {extra: api}) => {
    const {data} = await api.get<TSimilarProductArray>(`${APIRoute.Cameras}/${id}/similar`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<TReviewsArray, string, TAPIAction>('fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<TReviewsArray>(`${APIRoute.Cameras}/${id}/reviews`);
    return data;
  }
);

