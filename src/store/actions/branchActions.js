import {
  READ_BRANCHES_FAILURE,
  READ_BRANCHES_SUCCESSFUL,
  READ_BRANCHES_PENDING
} from "./actionTypes";
import axios from "axios";

export const setBranchesData = branches => {
  return {
    type: READ_BRANCHES_SUCCESSFUL,
    branches: branches,
    pagingInfo: branches.pop().__paging
  };
};

export const readBranchesFailed = () => {
  return {
    type: READ_BRANCHES_FAILURE
  };
};

export const readBranchesPending = () => {
  return {
    type: READ_BRANCHES_PENDING
  };
};

export const readBranches = pagingInfo => {
  const sortField = pagingInfo.sortField,
    sortOrder = pagingInfo.sortOrder,
    curPage = pagingInfo.curPage,
    pageSize = pagingInfo.pageSize;

  return dispatch => {
    dispatch(readBranchesPending());
    console.log(
      `${process.env.REACT_APP_BASE_URL_BRANCH}paging?sortField=${sortField}&sortOrder=${sortOrder}&currentPage=${curPage}&pageSize=${pageSize}`
    );
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL_BRANCH}paging?sortField=${sortField}&sortOrder=${sortOrder}&currentPage=${curPage}&pageSize=${pageSize}`
      )
      .then(response => {
        //console.log(`publisher data ${JSON.stringify(response.data, null, 2)}`);
        dispatch(setBranchesData(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(readBranchesFailed());
      });
  };
};
