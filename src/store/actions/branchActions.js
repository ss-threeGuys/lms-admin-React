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

export const addBranchesSuccess = branch => {
  return {
    type: actionTypes.ADD_BRANCHES_SUCCESSFUL,
    branch: branch
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

export const updateBranchesSuccess = () => {
  return {
    type: actionTypes.UPDATE_BRANCHES_SUCCESSFUL
  };
};

export const updateBranchesFailed = error => {
  return {
    type: actionTypes.UPDATE_BRANCHES_FAILURE,
    error: error
  };
};

export const updateBranchesPending = () => {
  return {
    type: actionTypes.UPDATE_BRANCHES_PENDING
  };
};

export const deleteBranchesSuccess = () => {
  return {
    type: actionTypes.DELETE_BRANCHES_SUCCESSFUL
  };
};

export const deleteBranchesFailed = error => {
  return {
    type: actionTypes.DELETE_BRANCHES_FAILURE,
    error: error
  };
};

export const deleteBranchesPending = () => {
  return {
    type: actionTypes.DELETE_BRANCHES_PENDING
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
    dispatch(addBranchesPending());
    axios
      .post(`${process.env.REACT_APP_BASE_URL_BRANCH}`, branch)
      .then(response => {
        const branch = response.data;

        dispatch(addBranchesSuccess(branch));
      })
      .catch(error => {
        dispatch(addBranchesFailed(error.message));
      });
  };
};

export const updateBranch = branch => {
  return dispatch => {
    dispatch(updateBranchesPending());
    axios
      .put(`${process.env.REACT_APP_BASE_URL_BRANCH}${branch._id}`, branch)
      .then(response => {
        dispatch(updateBranchesSuccess());
      })
      .catch(error => {
        dispatch(updateBranchesFailed(error.message));
      });
  };
};

export const deleteBranch = branch => {
  return dispatch => {
    dispatch(deleteBranchesPending());
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL_BRANCH}${branch._id}`,
        branch._id
      )
      .then(response => {
        dispatch(deleteBranchesSuccess());
      })
      .catch(error => {
        dispatch(deleteBranchesFailed(error.message));
      });
  };
};
