import { combineReducers } from "redux";

import authorsReducer from "./authorsReducer";
import booksReducer from "./booksReducer";
import genresReducer from "./genresReducer";
import publishersReducer from "./publishersReducer";
import branchesReducer from "./branchesReducer";
import borrowersReducer from "./borrowersReducer";
import { Target } from "../actions";
export * from "../actions";

export default combineReducers({
  [Target.AUTHOR]: authorsReducer,
  [Target.BOOK]: booksReducer,
  [Target.GENRE]: genresReducer,
  [Target.PUBLISHER]: publishersReducer,
  [Target.BRANCH]: branchesReducer,
  [Target.BORROWER]: borrowersReducer
});
