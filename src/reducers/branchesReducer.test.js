import branchesReducer from "./branchesReducer";
import {
  READ_BRANCHES_FAILURE,
  UPDATE_BRANCHES_PENDING,
  READ_BRANCHES_SUCCESSFUL,
  DELETE_BRANCHES_SUCCESSFUL,
  ADD_BRANCHES_SUCCESSFUL
} from "../actions/actionTypes";

describe("branchesReducer", () => {
  it("should return the initial state", () => {
    expect(branchesReducer(undefined, {})).toEqual({
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
        sortOrder: 1
      },
      requestPending: false,
      error: ""
    });
  });

  it("should change error message if read fails", () => {
    expect(
      branchesReducer(
        {
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
            sortOrder: 1
          },
          requestPending: false,
          error: ""
        },
        {
          type: READ_BRANCHES_FAILURE,
          error: "404 error"
        }
      )
    ).toEqual({
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
        sortOrder: 1
      },
      requestPending: false,
      error: "404 error"
    });
  });

  it("should change requestPending to true if update pending", () => {
    expect(
      branchesReducer(
        {
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
            sortOrder: 1
          },
          requestPending: false,
          error: ""
        },
        {
          type: UPDATE_BRANCHES_PENDING
        }
      )
    ).toEqual({
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
        sortOrder: 1
      },
      requestPending: true,
      error: ""
    });
  });

  it("should change branches={ ..} requestPending=true pagingInfo={..} if read successful", () => {
    expect(
      branchesReducer(
        {
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
            sortOrder: 1
          },
          requestPending: false,
          error: ""
        },
        {
          type: READ_BRANCHES_SUCCESSFUL,
          branches: [
            {
              _id: "5e6eae159a1f713ae6bed9d9",
              name: "Saurav Publishing Co., Ltd",
              __v: 0,
              address: "555 Burrito Avenue. ",
              phone: "(555) 555-6789"
            }
          ],

          pagingInfo: {
            currentPage: 1,
            pageSize: 1,
            totalPages: 23,
            prevPage: null,
            nextPage: 2,
            prev: false,
            next: true,
            count: 23,
            sortField: "branchName",
            sortOrder: "1"
          }
        }
      )
    ).toEqual({
      branches: [
        {
          _id: "5e6eae159a1f713ae6bed9d9",
          name: "Saurav Publishing Co., Ltd",
          __v: 0,
          address: "555 Burrito Avenue. ",
          phone: "(555) 555-6789"
        }
      ],
      pagingInfo: {
        currentPage: 1,
        pageSize: 1,
        totalPages: 23,
        prevPage: null,
        nextPage: 2,
        prev: false,
        next: true,
        count: 23,
        sortField: "branchName",
        sortOrder: "1"
      },
      requestPending: false,
      error: ""
    });
  });

  it("should change requestPending to false if delete successful", () => {
    expect(
      branchesReducer(
        {
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
            sortOrder: 1
          },
          requestPending: false,
          error: ""
        },
        {
          type: DELETE_BRANCHES_SUCCESSFUL
        }
      )
    ).toEqual({
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
        sortOrder: 1
      },
      requestPending: false,
      error: ""
    });
  });

  it("should add new state 'branch' and requestPending to false if add successful", () => {
    expect(
      branchesReducer(
        {
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
            sortOrder: 1
          },
          requestPending: false,
          error: ""
        },
        {
          type: ADD_BRANCHES_SUCCESSFUL,
          branch: {
            _id: "5e6eae159a1f713ae6bed9d9",
            name: "Saurav Publishing Co., Ltd",
            __v: 0,
            address: "555 Burrito Avenue. ",
            phone: "(555) 555-6789"
          }
        }
      )
    ).toEqual({
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
        sortOrder: 1
      },
      requestPending: false,
      error: "",
      branch: {
        _id: "5e6eae159a1f713ae6bed9d9",
        name: "Saurav Publishing Co., Ltd",
        __v: 0,
        address: "555 Burrito Avenue. ",
        phone: "(555) 555-6789"
      }
    });
  });
});
