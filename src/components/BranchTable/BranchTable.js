import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { connect } from "react-redux";
import * as branchActions from "../../store/actions/branchActions";

class BranchTable extends React.Component {
  constructor(props) {
    super(props);
    //console.log(
    //   `paging ${JSON.stringify(this.props.pagingInfo.count, null, 2)}`
    //  );
    this.componentName = "Branches";
    this.state = {
      selected: null,
      loading: false,
      totalRecords: 100
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
    //  const currentPage = 1 + event.first / this.props.pageSize;
    // this.props.dispatch(readBooks('title', 1, currentPage, this.props.pageSize))
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
    console.log(`props ${JSON.stringify(this.props.branches, null, 2)}`);
    return (
      <DataTable
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
        onPage={this.onPage}
        loading={this.state.loading}
      >
        {this.renderColumn()}
      </DataTable>
    );
  }
}

const mapStateToProps = state => {
  let branches = state.branchesReducer.branchData.branches;
  let pagingInfo = state.branchesReducer.branchData.pagingInfo;
  // let pagingInfo = branches.pop();
  console.log(`count ${JSON.stringify(pagingInfo.count, null, 2)}`);
  return {
    branches: branches,
    pagingInfo: pagingInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    readBranches: pagingInfo => dispatch(branchActions.readBranches(pagingInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable);
