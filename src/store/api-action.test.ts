import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extraActionsTypes, makeFakeCamera, makeFakePromo, makeFakeReview, makeFakeReviewPostRequest } from '../mocks/mocks';
import { TState } from '../types/type-store';
import { APIRoute } from '../const';
import { fetchCardAction, fetchCardsAction, fetchPromoAction, fetchReviewsAction, fetchSimilarProductsAction, postReviewAction } from './api-action';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(
      {
        DATA_CARDS: {
          cards: [],
          cardCurrent: null,
          similarProducts: []
        },
        PROMO: {promo: []},
        REVIEW: {reviews: []}
      },

    );
  });
  describe('fetchCardsAction', () => {
    it('should dispatch "fetchCardsAction.pending" and "fetchCardsAction.filfilled" with thunk "fetchCardsAction"', async () => {
      const mockCards = [makeFakeCamera()];
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCards);

      await store.dispatch(fetchCardsAction());

      const emmitedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emmitedActions);
      const fetchCardsActionFulfilled = emmitedActions.at(1) as ReturnType<typeof fetchCardsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCardsAction.pending.type,
        fetchCardsAction.fulfilled.type
      ]);
      expect(fetchCardsActionFulfilled.payload).toEqual(mockCards);
    });
    it('should dispatch "fetchCardsAction.pending" and "fetchCardsAction.rejected" with thunk "fetchCardsAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, []);

      await store.dispatch(fetchCardsAction());

      const extractedActionsTypes = extraActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchCardsAction.pending.type,
        fetchCardsAction.rejected.type
      ]);
    });
  });
  describe('fetchPromoAction', () => {
    it('should dispatch "fetchPromoAction.pending" and "fetchPromoAction.fulfilled" with thunk "fetchPromoAction"', async () => {
      const mockPromo = [makeFakePromo()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromo);

      await store.dispatch(fetchPromoAction());
      const emmitedAction = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emmitedAction);
      const fetchPromoActionFulfilled = emmitedAction.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type
      ]);

      expect(fetchPromoActionFulfilled.payload).toEqual(mockPromo);
    });
    it('should dispatch "fetchPromoAction.pending" and "fetchPromoAction.rejected" with thunk "fetchPromoAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoAction());
      const extractedActionsTypes = extraActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.rejected.type
      ]);
      expect(store.getState().PROMO?.promo).toEqual([]);
    });
  });
  describe('fetchCardAction', () => {
    it('should dispatch "fetchCardAction.pending" and "fetchCardAction.fulfilled" with thunk "fetchCardAction"', async () => {
      const mockCamera = makeFakeCamera();
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}`).reply(200, mockCamera);

      await store.dispatch(fetchCardAction(mockCamera.id));

      const emmitedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emmitedActions);
      const fetchCardActionFulfilled = emmitedActions.at(1) as ReturnType<typeof fetchCardAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCardAction.pending.type,
        fetchCardAction.fulfilled.type,
      ]);
      expect(fetchCardActionFulfilled.payload).toEqual(mockCamera);
    });
    it('should dispatch "fetchCardAction.pending" and "fetchCardAction.rejected" with thunk "fetchCardAction"', async () => {
      const mockCamera = makeFakeCamera();
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}`).reply(400, mockCamera);

      await store.dispatch(fetchCardAction(mockCamera.id));

      const emmitedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emmitedActions);

      expect(extractedActionsTypes).toEqual([
        fetchCardAction.pending.type,
        fetchCardAction.rejected.type,
      ]);
      expect(store.getState().DATA_CARDS?.cardCurrent).toEqual(null);
    });
  });
  describe('fetchSimilarProductsAction', () => {
    it('should dispatch "fetchSimilarProductsAction.pending" and "fetchSimilarProductsAction.fulfilled" with thunk "fetchSimilarProductsAction"', async () => {
      const mockCamera = makeFakeCamera();
      const mockSimilarProduct = [makeFakeCamera()];

      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}/similar`).reply(200, mockSimilarProduct);
      await store.dispatch(fetchSimilarProductsAction(mockCamera.id));

      const emmitedAction = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emmitedAction);
      const fetchSimilarProductsActionFulfilled = emmitedAction.at(1) as ReturnType<typeof fetchSimilarProductsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.fulfilled.type
      ]);
      expect(fetchSimilarProductsActionFulfilled.payload).toEqual(mockSimilarProduct);
    });
    it('should dispatch "fetchSimilarProductsAction.pending" and "fetchSimilarProductsAction.rejected" with thunk "fetchSimilarProductsAction"', async () => {
      const mockCamera = makeFakeCamera();

      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}/similar`).reply(400, []);
      await store.dispatch(fetchSimilarProductsAction(mockCamera.id));

      const emmitedAction = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emmitedAction);


      expect(extractedActionsTypes).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.rejected.type
      ]);
      expect(store.getState().DATA_CARDS?.similarProducts).toEqual([]);
    });
  });
  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.fulfilled" with thunk fetchReviewsAction', async () => {
      const mockReview = [makeFakeReview()];
      const mockCamera = makeFakeCamera();
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}/reviews`).reply(200, mockReview);

      await store.dispatch(fetchReviewsAction(mockCamera.id));
      const emmitedAction = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emmitedAction);
      const fetchReviewsActionFulfilled = emmitedAction.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);
      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReview);
    });
    it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.rejected" with thunk fetchReviewsAction', async () => {
      const mockCamera = makeFakeCamera();
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}/reviews`).reply(400, []);

      await store.dispatch(fetchReviewsAction(mockCamera.id));
      const extractedActionsTypes = extraActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type
      ]);
      expect(store.getState().REVIEW?.reviews).toEqual([]);
    });
  });
  describe('postReviewAction', () => {
    it('should dispatch "postReviewAction.pending" and "postReviewAction.fulfilled" with thunk postReviewAction', async () => {
      const mockReviewPost = makeFakeReviewPostRequest();
      mockAxiosAdapter.onPost(APIRoute.Post).reply(200, []);

      await store.dispatch(postReviewAction(mockReviewPost));

      const extractedActionsTypes = extraActionsTypes(store.getActions());
      expect(extractedActionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type
      ]);
    });
  });
});
