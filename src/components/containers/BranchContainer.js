import React, { Component } from "react";

import { connect } from "react-redux";
import * as branchActions from "../../actions/branchActions";
import { Target } from "../../reducers";
import log from "../../logger/log";
import BranchTable from "../BranchTable/BranchTable";

class BranchContainer extends Component {
  constructor(props) {
    super(props);

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

  render() {
    //log.info(`{JSON.stringify(this.props.branches, null, 2)}`);
    return (
      <BranchTable
        branches={this.props.branches}
        pagingInfo={{
          currentPage: this.props.pagingInfo.currentPage,
          pageSize: this.props.pagingInfo.pageSize,
          totalPages: this.props.pagingInfo.totalPages,
          prevPage: this.props.pagingInfo.prevPage,
          nextPage: this.props.pagingInfo.nextPage,
          prev: this.props.pagingInfo.prev,
          next: this.props.pagingInfo.next,
          count: this.props.pagingInfo.count,
          sortField: this.props.pagingInfo.sortField,
          sortOrder: this.props.pagingInfo.sortOrder
        }}
        loading={this.props.loading}
        error={this.props.error}
        addNew={this.addNew}
        save={this.save}
        delete={this.delete}
        onPage={this.onPage}
        updateProperty={(property, value) =>
          this.updateProperty(property, value)
        }
        first={this.state.first}
        selectedBranch={this.state.selectedBranch}
        branch={this.state.branch}
        newBranch={this.newBranch}
        onSort={this.onSort}
        onSelectionChange={e => this.setState({ selectedBranch: e.value })}
        displayDialog={this.state.displayDialog}
        onHide={() => this.setState({ displayDialog: false })}
        onRowSelect={e => this.onRowSelect(e)}
        valid={this.state.valid}
      ></BranchTable>
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

export default connect(mapStateToProps, mapDispatchToProps)(BranchContainer);
