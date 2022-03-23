import * as sagas from '../containers/App/store/saga';

export const initSagas = (sagaMiddleware) => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
