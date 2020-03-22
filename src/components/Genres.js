import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import {Messages} from 'primereact/messages';
export class Genres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: 0,
            displayDialog: false,
            valid: false
        }
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onGenreSelect = this.onGenreSelect.bind(this);
        this.addNew = this.addNew.bind(this);
        this.onPage = this.onPage.bind(this);
        this.onSort = this.onSort.bind(this);
    }

    componentDidMount() {
        this.readGenres();
        this.setState({ sortField: this.props.__paging.sortField, sortOrder: this.props.__paging.sortOrder })
    }

    readGenres() {
        this.props.actions.readGenres(this.props.__paging.sortField
            , this.props.__paging.sortOrder
            , this.props.__paging.currentPage
            , this.props.__paging.pageSize);
    }

    save() {
        if (this.newGenre) {
            this.props.actions.createGenre(this.state.genre)
                .then(() => { this.readGenres() });
        }
        else {
            this.props.actions.updateGenre(this.state.genre)
                .then(() => { this.readGenres() });
        }
        this.setState({ selectedGenre: null, genre: null, displayDialog: false });
    }

    onPage(event) {
        this.setState({ first: event.first });
        const currentPage = 1 + (event.first / this.props.__paging.pageSize)
        this.props.actions.readGenres(this.state.sortField, this.state.sortOrder, currentPage, this.props.__paging.pageSize)
    }

    onSort(event) {
        this.setState({ sortField: event.sortField, sortOrder: event.sortOrder })
        this.props.actions.readGenres(event.sortField, event.sortOrder, this.props.__paging.currentPage, this.props.__paging.pageSize);
    }

    delete() {
        this.props.actions.deleteGenre(this.state.genre)
            .then(() => { this.readGenres() });
        this.setState({ selectedGenre: null, genre: null, displayDialog: false });
    }

    updateProperty(property, value) {
        let genre = this.state.genre;
        genre[property] = value;
        this.setState({ genre: genre });
    }

    onGenreSelect(event) {
        this.newGenre = false;
        this.setState({ displayDialog: true, genre: Object.assign({}, event.data), valid: true })
    }

    addNew() {
        this.newGenre = true;
        this.setState({ genre: { name: '' }, displayDialog: true, valid: false });
    }

    validate(name) {
        if (name) {
            this.setState({valid: true});
            this.messages.clear();
        }
        else {
            this.setState({valid: false});
            this.messages.show({ closable: false, sticky: true, severity: 'error', detail: 'Name Required' });
        }
    }

    render() {
        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Genres</div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            {(!this.newGenre) && <Button label="Delete" icon="pi pi-times" onClick={this.delete} />}
            <Button disabled={!this.state.valid} label="Save" icon="pi pi-check" onClick={this.save} />
        </div>;

        return (
            <div>

                <div className="content-section implementation">
                    <DataTable value={this.props.genres} paginator={true} rows={this.props.__paging.pageSize} header={header} footer={footer} totalRecords={this.props.__paging.count}
                        selectionMode="single" selection={this.state.selectedGenre} onSelectionChange={event => this.setState({ selectedGenre: event.value })}
                        onRowSelect={this.onGenreSelect} lazy={true} first={this.state.first} onPage={this.onPage} loading={this.props.loading}
                        sortField={this.state.sortField} sortOrder={this.state.sortOrder} onSort={this.onSort}>
                        <Column field="name" header="Name" sortable={true} />
                    </DataTable>

                    <Dialog visible={this.state.displayDialog} width="300px" header="Genre Details" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                        {
                            this.state.genre &&

                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="name">Name*</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value); this.validate(e.target.value) }} value={this.state.genre.name} />
                                    <Messages ref={(el) => this.messages = el}></Messages>
                                </div>
                            </div>
                        }
                    </Dialog>
                </div>

            </div>
        );
    }
}