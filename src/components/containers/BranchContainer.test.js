import React from "react";

import { shallow } from "enzyme";
import BranchTable from "../BranchTable/BranchTable";
import { BranchContainer } from "./BranchContainer";
import { readBranches } from "../../actions/branchActions";

describe("<BranchContainer />", () => {
  let wrapper;
  let pagingInfo = {
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
  };
  const readBranches = () => {};
  beforeEach(() => {
    wrapper = shallow(
      <BranchContainer pagingInfo={pagingInfo} readBranches={readBranches} />
    );
  });

  it("should render <BranchTable />", () => {
    expect(wrapper.find(BranchTable)).toHaveLength(1);
  });
});
