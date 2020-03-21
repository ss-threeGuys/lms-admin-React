import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";

const middlewares = [reduxImmutableStateInvariant(), thunk, logger];

const configureStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default configureStore;
