import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-router/history-router';
import { browserHistory } from '../../browser-history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import PageMain from '../../pages/page-main/page-main';
import PageCamera from '../../pages/page-camera/page-camera';
import PageOrder from '../../pages/page-order/page-order';
import PageNotFound from '../../pages/page-not-found/page-not-found';

export default function App () {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<PageMain />}
          />
          <Route
            path={AppRoute.Camera}
            element={<PageCamera />}
          />
          <Route
            path={AppRoute.Orders}
            element={<PageOrder />}
          />
          <Route
            path='*'
            element={<PageNotFound />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
