import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
];
// This part is for the Redux DevTools for browsers 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares),
    )
);
