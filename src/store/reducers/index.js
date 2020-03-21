import { combineReducers } from "redux";

import branchesReducer from "./branchesReducer";

export const Target = {
  BOOK: "TARGET:BOOK",
  PUBLISHER: "TARGET:PUBLISHER",
  AUTHOR: "TARGET:AUTHOR",
  GENRE: "TARGET:GENRE",
  BRANCH: "TARGET:BRANCH",
  BORROWER: "TARGET:BORROWER"
};

export const Task = {
  CREATE: "TASK:CREATE",
  RETRIEVE: "TASK:RETRIEVE",
  UPDATE: "TASK:UPDATE",
  DELETE: "TASK:DELETE"
};

export default combineReducers({
  branchesReducer
});
