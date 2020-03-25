import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { connect } from "react-redux";
import * as branchActions from "../../actions/branchActions";
import { Target } from "../../reducers";

class BranchTable extends Component {
  constructor(props) {
    super(props);

    this.componentName = "Branches";
    this.state = {
      first: 0,
      displayDialog: false,
      valid: true
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

  hideDialog = displayState => {
    this.setState({ displayDialog: displayState });
  };

  onRowSelect = event => {
    this.newBranch = false;
    this.setState({
      displayDialog: true,
      branch: { ...event.data },
      valid: true
    });
  };

  onSort = event => {
    const pagingInfo = {
      sortField: event.sortField,
      sortOrder: event.sortOrder,
      curPage: this.props.pagingInfo.currentPage,
      pageSize: this.props.pagingInfo.pageSize
    };
    this.setState({ sortField: event.sortField, sortOrder: event.sortOrder });
    this.props.readBranches(pagingInfo);
  };

  onPage = event => {
    const pageSize = this.props.pagingInfo.pageSize;
    const currentPage = 1 + event.first / pageSize;

    const pagingInfo = {
      sortField: this.props.pagingInfo.sortField,
      sortOrder: this.props.pagingInfo.sortOrder,
      curPage: currentPage,
      pageSize: this.props.pagingInfo.pageSize
    };

    this.props.readBranches(pagingInfo);
    this.setState({ first: event.first });
  };

  updateProperty = (property, value) => {
    let branch = this.state.branch;
    branch[property] = value;
    this.setState({ branch: branch });
    if (this.state.branch.branchName.trim().length >= 2) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  };

  addNew = () => {
    this.newBranch = true;
    this.setState({
      branch: { branchName: " ", branchAddress: " " },
      valid: false,
      displayDialog: true
    });
  };

  save = () => {
    const pagingInfo = {
      sortField: this.props.pagingInfo.sortField,
      sortOrder: this.props.pagingInfo.sortOrder,
      curPage: this.props.pagingInfo.curPage,
      pageSize: this.props.pagingInfo.pageSize
    };
    if (this.newBranch) {
      Promise.resolve(this.props.addBranch(this.state.branch)).then(() => {
        this.props.readBranches(pagingInfo);
      });
    } else {
      Promise.resolve(this.props.updateBranch(this.state.branch)).then(() =>
        this.props.readBranches(pagingInfo)
      );
    }

    this.setState({ selectedBranch: null, branch: null, displayDialog: false });
  };

  delete = () => {
    const pagingInfo = {
      sortField: this.props.pagingInfo.sortField,
      sortOrder: this.props.pagingInfo.sortOrder,
      curPage: this.props.pagingInfo.curPage,
      pageSize: this.props.pagingInfo.pageSize
    };
    Promise.resolve(this.props.deleteBranch(this.state.branch)).then(() =>
      this.props.readBranches(pagingInfo)
    );

    this.setState({
      selectedBranch: null,
      branch: null,
      displayDialog: false
    });
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

  renderDialog = footer => {
    return (
      <Dialog
        visible={this.state.displayDialog}
        width="300px"
        header="Branch Details"
        modal={true}
        footer={footer}
        onHide={() => this.setState({ displayDialog: false })}
      >
        {this.state.branch && (
          <div className="p-grid p-fluid">
            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="branchName">Branch Name</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="branchName"
                onChange={e => {
                  this.updateProperty("branchName", e.target.value);
                }}
                value={this.state.branch.branchName}
              />
            </div>
            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="branchAddress">Branch Address</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="branchAddress"
                onChange={e => {
                  this.updateProperty("branchAddress", e.target.value);
                }}
                value={this.state.branch.branchAddress}
              />
            </div>
          </div>
        )}
      </Dialog>
    );
  };

  render() {
    const header = (
      <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
        {this.componentName}
      </div>
    );

    const footer = (
      <div className="p-clearfix" style={{ width: "100%" }}>
        <Button
          style={{ float: "left" }}
          label="Add"
          icon="pi pi-plus"
          onClick={this.addNew}
        />
      </div>
    );
    const dialogFooter = (
      <div className="ui-dialog-buttonpane p-clearfix">
        {!this.newBranch && (
          <Button label="Delete" icon="pi pi-times" onClick={this.delete} />
        )}
        <Button
          disabled={!this.state.valid}
          label="Save"
          icon="pi pi-check"
          onClick={this.save}
        />
      </div>
    );
    return (
      <React.Fragment>
        <DataTable
          ref={el => (this.dt = el)}
          value={this.props.branches}
          paginator={true}
          rows={this.props.pagingInfo.pageSize}
          totalRecords={this.props.pagingInfo.count}
          header={header}
          footer={footer}
          selectionMode="single"
          selection={this.state.selectedBranch}
          onSelectionChange={e => this.setState({ selected: e.value })}
          onRowSelect={this.onRowSelect}
          lazy={true}
          first={this.state.first}
          onPage={this.onPage}
          loading={this.props.loading}
          sortField={this.props.pagingInfo.sortField}
          sortOrder={parseInt(this.props.pagingInfo.sortOrder)}
          onSort={this.onSort}
        >
          {this.renderColumn()}
        </DataTable>
        {this.renderDialog(dialogFooter)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  let branches = state[Target.BRANCH].branches;
  let pagingInfo = state[Target.BRANCH].pagingInfo;
  let loading = state[Target.BRANCH].requestPending;
  let error = state[Target.BRANCH].error;

  return {
    branches: branches,
    pagingInfo: pagingInfo,
    loading: loading,
    error: error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    readBranches: pagingInfo =>
      dispatch(branchActions.readBranches(pagingInfo)),
    addBranch: branch => dispatch(branchActions.addBranch(branch)),
    updateBranch: branch => dispatch(branchActions.updateBranch(branch)),
    deleteBranch: branch => dispatch(branchActions.deleteBranch(branch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable);
