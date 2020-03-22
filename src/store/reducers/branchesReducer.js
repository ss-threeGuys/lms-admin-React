import {
  READ_BRANCHES_FAILURE,
  READ_BRANCHES_SUCCESSFUL,
  READ_BRANCHES_PENDING
} from "../actions/actionTypes";

const initialState = {
  branches: [],
  pagingInfo: {
    currentPage: 1,
    pageSize: 0,
    totalPages: 0,
    prevPage: null,
    nextPage: 2,
    prev: false,
    next: null,
    count: 0,
    sortField: "branchName",
    sortOrder: "1"
  },
  requestPending: false,
  error: ""
};

const branchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_BRANCHES_PENDING:
      return { ...state, requestPending: true };

    case READ_BRANCHES_SUCCESSFUL:
      return {
        ...state,
        branches: action.branches,
        pagingInfo: action.pagingInfo,
        requestPending: false
      };

    case READ_BRANCHES_FAILURE:
      return {
        ...state,
        requestPending: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default branchesReducer;
