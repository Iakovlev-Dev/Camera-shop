import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { TFormFielsRequest, TFormFielsResponse } from '../components/product-review-form/product-review-form';
import { LoadingDataStatus } from '../const';
import { TCamera } from '../types/type-camera';
import { TPromo } from '../types/type-promo';
import { TReviews } from '../types/type-reviews';
import { TState } from '../types/type-store';
import * as faker from 'faker';
import { createAPI } from '../services/api';

export type AppThunkDispatch = ThunkDispatch<TState, ReturnType<typeof createAPI>, Action>

export const extraActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

export const makeFakeStore = (initialState: Partial<TState>) => ({
  DATA_CARDS: {
    cards: [],
    promo: [],
    cardCurrent: null,
    similarProducts: [],
    isLoadingData: false,
    isLoadibgDataRejected: false
  },
  PROMO: {promo: null},
  REVIEW: {
    reviews: [],
    reviewSendingStatus: LoadingDataStatus.Unsent,
    isPostSuccess: false,
  },
  ...initialState ?? {}
});

export const makeFakePromo = (): TPromo => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  previewImg: faker.image.imageUrl(),
  previewImg2x: faker.image.imageUrl(),
  previewImgWebp: faker.image.imageUrl(),
  previewImgWebp2x: faker.image.imageUrl(),
});

export const makeFakeCamera = (): TCamera => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  vendorCode: faker.lorem.word(),
  type: faker.lorem.word(),
  category: faker.lorem.word(),
  description: faker.lorem.paragraph(),
  level: faker.lorem.word(),
  price: Number(faker.commerce.price()),
  rating: faker.datatype.number({max: 5}),
  reviewCount: faker.datatype.number(),
  previewImg: faker.image.imageUrl(),
  previewImg2x: faker.image.imageUrl(),
  previewImgWebp: faker.image.imageUrl(),
  previewImgWebp2x: faker.image.imageUrl(),
});

export const makeFakeReview = (): TReviews => ({
  id: faker.lorem.word(),
  createAt: faker.lorem.word(),
  cameraId: faker.datatype.number(),
  userName: faker.name.findName(),
  advantage: faker.lorem.sentence(),
  disadvantage: faker.lorem.sentence(),
  review: faker.lorem.paragraph(),
  rating: faker.datatype.number({max: 5}),
});

export const makeFakeReviewPostResponse = (): TFormFielsResponse => ({
  id: faker.lorem.word(),
  createAt: faker.lorem.word(),
  cameraId: faker.datatype.number(),
  userName: faker.name.findName(),
  advantage: faker.lorem.sentence(),
  disadvantage: faker.lorem.sentence(),
  review: faker.lorem.paragraph(),
  rating: faker.datatype.number({max: 5}),
});

export const makeFakeReviewPostRequest = (): TFormFielsRequest => ({
  cameraId: faker.datatype.number(),
  userName: faker.name.findName(),
  advantage: faker.lorem.sentence(),
  disadvantage: faker.lorem.sentence(),
  review: faker.lorem.paragraph(),
  rating: faker.datatype.number({max: 5}),
});
