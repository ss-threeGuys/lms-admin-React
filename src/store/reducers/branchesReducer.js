import {
  READ_BRANCHES_FAILURE,
  READ_BRANCHES_SUCCESSFUL,
  READ_BRANCHES_PENDING
} from "../actions/actionTypes";

const initialState = {
  branchData: {
    branches: [],
    pagingInfo: {
      currentPage: 1,
      pageSize: null,
      totalPages: null,
      prevPage: null,
      nextPage: 2,
      prev: false,
      next: null,
      count: null,
      sortField: "branchName",
      sortOrder: "1"
    },
    requestPending: false,
    error: ""
  }
};

const branchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_BRANCHES_PENDING:
      return { ...state, branchData: { requestPending: true } };

    case READ_BRANCHES_SUCCESSFUL:
      return {
        ...state,
        branchData: {
          branches: action.branches,
          pagingInfo: action.pagingInfo,
          requestPending: false
        }
      };

    case READ_BRANCHES_FAILURE:
      return {
        ...state,
        branchData: { requestPending: false, error: "There is an error" }
      };

    default:
      return state;
  }
};

export default branchesReducer;
