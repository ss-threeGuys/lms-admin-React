import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import {Message} from 'primereact/message';
export class Borrowers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: 0,
            displayDialog: false,
            valid: false,
            nameValid: true,
            phoneValid: true
        }
    }

    componentDidMount() {
        this.readBorrowers();
        this.setState({ sortField: this.props.__paging.sortField, sortOrder: this.props.__paging.sortOrder })
    }

    readBorrowers() {
        this.props.actions.readBorrowers(this.props.__paging.sortField
            , this.props.__paging.sortOrder
            , this.props.__paging.currentPage
            , this.props.__paging.pageSize);
    }

    save = () => {
        if (this.newBorrower) {
            this.props.actions.createBorrower(this.state.borrower)
                .then(() => { this.readBorrowers() });
        }
        else {
            this.props.actions.updateBorrower(this.state.borrower)
                .then(() => { this.readBorrowers() });
        }
        this.setState({ selectedBorrower: null, borrower: null, displayDialog: false });
    }

    onPage = (event) => {
        this.setState({ first: event.first });
        const currentPage = 1 + (event.first / this.props.__paging.pageSize)
        this.props.actions.readBorrowers(this.state.sortField, this.state.sortOrder, currentPage, this.props.__paging.pageSize)
    }

    onSort = (event) => {
        this.setState({sortField: event.sortField, sortOrder: event.sortOrder})
        this.props.actions.readBorrowers(event.sortField, event.sortOrder, this.props.__paging.currentPage, this.props.__paging.pageSize);
    }

    delete = ()  => {
        this.props.actions.deleteBorrower(this.state.borrower)
            .then(() => { this.readBorrowers() });
        this.setState({ selectedBorrower: null, borrower: null, displayDialog: false });
    }

    updateProperty = (property, value) => {
        let borrower = this.state.borrower;
        borrower[property] = value;
        this.setState({ borrower: borrower });
    }

    onBorrowerSelect = (event) => {
        this.newBorrower = false;
        this.setState({ displayDialog: true, borrower: Object.assign({}, event.data), valid: true })
    }

    addNew = () => {
        this.newBorrower = true;
        this.setState({ borrower: { name: '' }, displayDialog: true, valid: false });
    }

    validate = () => {
        if (this.state.borrower.name && (!this.state.borrower.phone || /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(this.state.borrower.phone))) {
            this.setState({valid: true});
        }
        if (!this.state.borrower.name) {
            this.setState({valid: false, nameValid: false});
        }
        if (this.state.borrower.name) {
            this.setState({nameValid: true});
        }
        if (this.state.borrower.phone && !(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(this.state.borrower.phone))) {
            this.setState({valid: false, phoneValid: false});
        }
        if (this.state.borrower.phone && /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(this.state.borrower.phone)) {
            this.setState({phoneValid: true});
        }
        if (!this.state.borrower.phone) {
            this.setState({phoneValid: true})
        }
    }

    render() {
        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Borrowers</div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            {(!this.newBorrower) && <Button label="Delete" icon="pi pi-times" onClick={this.delete} />}
            <Button disabled={!this.state.valid} label="Save" icon="pi pi-check" onClick={this.save} />
        </div>;

        return (
            <div>
                
                <div className="content-section implementation">
                    <DataTable value={this.props.borrowers} paginator={true} rows={this.props.__paging.pageSize} header={header} footer={footer} totalRecords={this.props.__paging.count}
                        selectionMode="single" selection={this.state.selectedBorrower} onSelectionChange={event => this.setState({ selectedBorrower: event.value })}
                        onRowSelect={this.onBorrowerSelect} lazy={true} first={this.state.first} onPage={this.onPage} loading={this.props.loading}
                        sortField={this.state.sortField} sortOrder={this.state.sortOrder} onSort={this.onSort}>
                        <Column field="name" header="Name" sortable={true} />
                        <Column field="address" header="Address" sortable={true} />
                        <Column field="phone" header="Phone Number" sortable={true} />
                    </DataTable>

                    <Dialog visible={this.state.displayDialog} width="300px" header="Borrower Details" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                        {
                            this.state.borrower &&

                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="name">Name*</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value); this.validate() }} value={this.state.borrower.name} />
                                    {(!this.state.nameValid) && <Message severity="error" text="Name is required"></Message>}
                                </div>
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="name">Address</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="address" onChange={(e) => { this.updateProperty('address', e.target.value); this.validate() }} value={this.state.borrower.address || ''} />
                                </div>
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="name">Phone Number</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="phone" onChange={(e) => { this.updateProperty('phone', e.target.value); this.validate() }} value={this.state.borrower.phone || ''} />
                                    {(!this.state.phoneValid) && <Message severity="error" text="Please enter valid phone number"></Message>}
                                </div>
                            </div>
                        }
                    </Dialog>
                </div>

            </div>
        );
    }
}