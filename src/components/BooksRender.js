import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export const BooksRender = (props) => {

    const outputBooks = props.mapBooksToOutputBook(props.books);

    let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>{props.componentName}</div>;

    let footer = <div className="p-clearfix" style={{ width: '100%' }}>
        <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" onClick={props.addNew} />
    </div>;

    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
        {(!props.newBook) && <Button label="Delete" icon="pi pi-times" onClick={props.delete} />}
        <Button disabled={!props.valid} label="Save" icon="pi pi-check" onClick={props.save} />
    </div>;

    const sortFields = {
        "title": "title",
        "authors": "authorNames",
        "genres": "genreNames",
        "publisher": "publisherName"
    }

    let sortField = sortFields[props.sortField]



    if (props.loading) {
        return <p>loading...</p>
    }

    return (
        <div>
            <DataTable value={outputBooks} paginator={true} rows={props.pageSize} totalRecords={props.totalRecords}
                lazy={true} first={props.first} onPage={props.onPage} onSort={props.onSort} loading={props.loading} footer={footer}
                selectionMode="single" selection={props.selectedBook} onSelectionChange={e => props.onSelectionChange(e)}
                onRowSelect={props.onRowSelect} header={header} sortField={sortField} sortOrder={props.sortOrder}>

                <Column field="title" header="Title" sortable={true} />
                <Column field="authorNames" header="Authors" sortable={true} />
                <Column field="genreNames" header="Genres" sortable={true} />
                <Column field="publisherName" header="Publisher" sortable={true} />
            </DataTable>

            <Dialog visible={props.displayDialog} width="300px" header="Book Details" modal={true} footer={dialogFooter} onHide={() => props.onHide()}>
                {
                    props.book &&

                    <div className="p-grid p-fluid">
                        <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="title">Title</label></div>
                        <div className="p-col-8" style={{ padding: '.5em' }}>
                            <InputText id="title" required={true} onChange={e => props.onChange(e, 'title')} value={props.book.title} />
                        </div>
                        <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="authors">Authors</label></div>
                        <div className="p-col-8" style={{ padding: '.5em' }}>
                            <MultiSelect options={props.authors} id="authors" onChange={e => props.onChange(e, 'authors')} value={props.book.authors} filter={true} />
                        </div>
                        <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="genres">Genres</label></div>
                        <div className="p-col-8" style={{ padding: '.5em' }}>
                            <MultiSelect options={props.genres} id="genres" onChange={(e) => props.onChange(e, 'genres')} value={props.book.genres} filter={true} />
                        </div>
                        <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="publishers">Publishers</label></div>
                        <div className="p-col-8" style={{ padding: '.5em' }}>
                            <Dropdown options={props.publishers} id="publishers" onChange={(e) => props.onChange(e, 'publisher')} value={props.book.publisher} filter={true} />
                        </div>
                    </div>
                }

            </Dialog>
        </div>
    )

}