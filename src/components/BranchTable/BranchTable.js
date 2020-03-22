import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { connect } from "react-redux";
import * as branchActions from "../../store/actions/branchActions";

class BranchTable extends Component {
  constructor(props) {
    super(props);

    this.componentName = "Branches";
    this.state = {
      first: 0
    };
  }
  componentDidMount() {
    // console.log("read Branches");
    const pagingInfo = {
      sortField: "branchName",
      sortOrder: 1,
      curPage: 1,
      pageSize: 10
    };
    this.props.readBranches(pagingInfo);
  }

  onRowSelect = event => {
    console.log(event);
  };

  onPage = event => {
    const pageSize = this.props.pagingInfo.pageSize;
    const currentPage = 1 + event.first / pageSize;

    const pagingInfo = {
      sortField: "branchName",
      sortOrder: 1,
      curPage: currentPage,
      pageSize: pageSize
    };

    this.props.readBranches(pagingInfo);
    this.setState({ first: event.first });
  };

  onModelFilterChange = event => {
    console.log(event);
  };

  renderColumn = () => {
    const branchColumns = [
      { field: "branchName", header: "Branch Name" },
      { field: "branchAddress", header: "Branch Address" }
    ];
    return branchColumns.map(col => (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        sortable={true}
      />
    ));
  };

  render() {
    let header = (
      <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
        {this.componentName}
      </div>
    );

    let footer = (
      <div className="p-clearfix" style={{ width: "100%" }}>
        <Button
          style={{ float: "left" }}
          label="Add"
          icon="pi pi-plus"
          onClick={this.addNew}
        />
      </div>
    );
    return (
      <DataTable
        ref={el => (this.dt = el)}
        value={this.props.branches}
        paginator={true}
        rows={this.props.pagingInfo.pageSize}
        totalRecords={this.props.pagingInfo.count}
        header={header}
        footer={footer}
        selectionMode="single"
        selection={this.state.selected}
        onSelectionChange={e => this.setState({ selected: e.value })}
        onRowSelect={this.onRowSelect}
        lazy={true}
        first={this.state.first}
        onPage={this.onPage}
        loading={this.props.loading}
      >
        {this.renderColumn()}
      </DataTable>
    );
  }
}

const mapStateToProps = state => {
  let branches = state.branchesReducer.branches;
  let pagingInfo = state.branchesReducer.pagingInfo;
  let loading = state.branchesReducer.requestPending;
  let error = state.branchesReducer.error;

  return {
    branches: branches,
    pagingInfo: pagingInfo,
    loading: loading,
    error: error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    readBranches: pagingInfo => dispatch(branchActions.readBranches(pagingInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable);
