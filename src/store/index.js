import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
];

export default createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);
