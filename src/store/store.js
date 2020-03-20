import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
];

const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);

export default store;
