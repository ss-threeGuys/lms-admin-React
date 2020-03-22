import * as actionTypes from "./actionTypes";
import axios from "axios";

export const readBranchesSuccess = (branches, pagingInfo) => {
  return {
    type: actionTypes.READ_BRANCHES_SUCCESSFUL,
    branches: branches,
    pagingInfo: pagingInfo
  };
};

export const readBranchesFailed = error => {
  return {
    type: actionTypes.READ_BRANCHES_FAILURE,
    error: error
  };
};

export const readBranchesPending = () => {
  return {
    type: actionTypes.READ_BRANCHES_PENDING
  };
};

export const addBranchesSuccess = (branches, pagingInfo) => {
  return {
    type: actionTypes.ADD_BRANCHES_SUCCESSFUL,
    branches: branches,
    pagingInfo: pagingInfo
  };
};

export const addBranchesFailed = error => {
  return {
    type: actionTypes.ADD_BRANCHES_FAILURE,
    error: error
  };
};

export const addBranchesPending = () => {
  return {
    type: actionTypes.ADD_BRANCHES_PENDING
  };
};

export const readBranches = pagingInfo => {
  const sortField = pagingInfo.sortField,
    sortOrder = pagingInfo.sortOrder,
    curPage = pagingInfo.curPage,
    pageSize = pagingInfo.pageSize;

  return dispatch => {
    dispatch(readBranchesPending());

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL_BRANCH}paging?sortField=${sortField}&sortOrder=${sortOrder}&currentPage=${curPage}&pageSize=${pageSize}`
      )
      .then(response => {
        //console.log(`publisher data ${JSON.stringify(response.data, null, 2)}`);
        let branches = response.data;
        let pagingInfo = branches.pop().__paging;

        dispatch(readBranchesSuccess(branches, pagingInfo));
      })
      .catch(error => {
        dispatch(readBranchesFailed(error.message));
      });
  };
};

export const addBranch = branch => {
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL_BRANCH}branches`, branch)
      .then(response => {});
  };
};
