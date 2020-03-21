import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
export class Genres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: 0,
            displayDialog: false
        }
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onGenreSelect = this.onGenreSelect.bind(this);
        this.addNew = this.addNew.bind(this);
        this.onPage = this.onPage.bind(this);
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
            this.props.actions.createGenre(this.state.genre);
        }
        else {
            this.props.actions.updateGenre(this.state.genre);
        }
        this.setState({ selectedGenre: null, genre: null, displayDialog: false });
    }

    onPage(event) {
        this.setState({first: event.first});
        const currentPage = 1 + (event.first / this.props.__paging.pageSize)
        this.props.actions.readGenres(this.state.sortField, this.state.sortOrder, currentPage, this.props.__paging.pageSize)
    }

    delete() {
        this.props.actions.deleteGenre(this.state.genre);
        this.setState({ selectedGenre: null, genre: null, displayDialog: false });
    }

    updateProperty(property, value) {
        let genre = this.state.genre;
        genre[property] = value;
        this.setState({ genre: genre });
    }

    onGenreSelect(event) {
        this.newGenre = false;
        this.setState({ displayDialog: true, genre: Object.assign({}, event.data) })
    }

    addNew() {
        this.newGenre = true;
        this.setState({ genre: { name: '' }, displayDialog: true });
    }

    render() {
        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Genres</div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Delete" icon="pi pi-times" onClick={this.delete} />
            <Button label="Save" icon="pi pi-check" onClick={this.save} />
        </div>;

        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DataTable</h1>
                        <p>This samples demonstrates a CRUD implementation using various PrimeReact components.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataTable value={this.props.genres} paginator={true} rows={this.props.__paging.pageSize} header={header} footer={footer} totalRecords={this.props.__paging.count}
                        selectionMode="single" selection={this.state.selectedGenre} onSelectionChange={event => this.setState({ selectedGenre: event.value })}
                        onRowSelect={this.onGenreSelect} lazy={true} first={this.state.first} onPage={this.onPage} loading={this.props.loading}
                        sortField={this.state.sortField} sortOrder={this.state.sortOrder} onSort={(e) => this.setState({ sortField: e.sortField, sortOrder: e.sortOrder })}>
                        <Column field="name" header="Name" sortable={true} />
                    </DataTable>

                    <Dialog visible={this.state.displayDialog} width="300px" header="Genre Details" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                        {
                            this.state.genre &&

                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="name">Name</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.genre.name} />
                                </div>
                            </div>
                        }
                    </Dialog>
                </div>

            </div>
        );
    }
}