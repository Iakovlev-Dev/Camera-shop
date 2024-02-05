import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { TState } from '../types/type-store';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from './mocks';
import { Provider } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { TFormFielsRequest } from '../components/product-review-form/product-review-form';

export function withHistory (component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore (
  component: JSX.Element,
  initialState: Partial<TState> = {}
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(mockAxiosAdapter)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return(
    {
      withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
      mockStore,
      mockAxiosAdapter
    }
  );
}

export function useWithForm (component: JSX.Element) {
  const method = useForm<TFormFielsRequest>();

  return (
    <FormProvider {...method}>
      {component}
    </FormProvider>
  );
}
