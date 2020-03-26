import React from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import log from "../../logger/log";
const BranchTable = props => {
  const header = (
    <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
      Branches
    </div>
  );

  const footer = (
    <div className="p-clearfix" style={{ width: "100%" }}>
      <Button
        style={{ float: "left" }}
        label="Add"
        icon="pi pi-plus"
        onClick={props.addNew}
      />
    </div>
  );

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      {!props.newBranch && (
        <Button label="Delete" icon="pi pi-times" onClick={props.delete} />
      )}
      <Button
        disabled={!props.valid}
        label="Save"
        icon="pi pi-check"
        onClick={props.save}
      />
    </div>
  );

  const renderDialog = footer => {
    return (
      <Dialog
        visible={props.displayDialog}
        width="300px"
        header="Branch Details"
        modal={true}
        footer={footer}
        onHide={props.onHide}
      >
        {props.branch && (
          <div className="p-grid p-fluid">
            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="branchName">Branch Name</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="branchName"
                onChange={e => {
                  props.updateProperty("branchName", e.target.value);
                }}
                value={props.branch.branchName}
              />
            </div>
            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="branchAddress">Branch Address</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="branchAddress"
                onChange={e => {
                  props.updateProperty("branchAddress", e.target.value);
                }}
                value={props.branch.branchAddress}
              />
            </div>
          </div>
        )}
      </Dialog>
    );
  };
  return (
    <React.Fragment>
      <DataTable
        value={props.branches}
        paginator={true}
        rows={props.pagingInfo.pageSize}
        totalRecords={props.pagingInfo.count}
        header={header}
        footer={footer}
        selectionMode="single"
        selection={props.selectedBranch}
        onSelectionChange={e => props.onSelectionChange(e)}
        onRowSelect={props.onRowSelect}
        lazy={true}
        first={props.first}
        onPage={props.onPage}
        loading={props.loading}
        sortField={props.pagingInfo.sortField}
        sortOrder={parseInt(props.pagingInfo.sortOrder)}
        onSort={props.onSort}
      >
        {renderColumn()}
      </DataTable>
      {renderDialog(dialogFooter)}
    </React.Fragment>
  );
};

const renderColumn = () => {
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
export default BranchTable;
