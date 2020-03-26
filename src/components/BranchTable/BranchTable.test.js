import React from "react";

import { shallow } from "enzyme";
import BranchTable from "./BranchTable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

describe("<BranchTable />", () => {
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
  const onHide = () => {};
  beforeEach(() => {
    wrapper = shallow(<BranchTable pagingInfo={pagingInfo} onHide={onHide} />);
  });

  it("should render 1 <DataTable /> elements", () => {
    expect(wrapper.find(DataTable)).toHaveLength(1);
  });
  it("should render 1 <Column /> elements", () => {
    expect(wrapper.find(Column)).toHaveLength(2);
  });
  it("should render 1 <Dialog /> elements", () => {
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });
});
