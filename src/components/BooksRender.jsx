import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

const BooksRender = (props) => {

  const {
    mapBooksToOutputBook,
    books,
    componentName,
    addNew,
    newBook,
    valid,
    deleteBook,
    save,
    sortFieldProp,
    loading,
    pageSize,
    totalRecords,
    first,
    onPage,
    onSort,
    selectedBook,
    onSelectionChange,
    onRowSelect,
    sortOrder,
    displayDialog,
    book,
    handleChange,
    allAuthors,
    allGenres,
    allPublishers,
    handleHide,

  } = props;

  const outputBooks = mapBooksToOutputBook(books);

  const header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>{componentName}</div>;

  const footer = (
    <div className="p-clearfix" style={{ width: '100%' }}>
      <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" onClick={addNew} />
    </div>
  );

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      {(!newBook) && <Button label="Delete" icon="pi pi-times" onClick={deleteBook} />}
      <Button disabled={!valid} label="Save" icon="pi pi-check" onClick={save} />
    </div>
  );

  const sortFields = {
    title: 'title',
    authors: 'authorNames',
    genres: 'genreNames',
    publisher: 'publisherName',
  };

  const sortField = sortFields[sortFieldProp];

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <DataTable
        value={outputBooks}
        paginator
        rows={pageSize}
        totalRecords={totalRecords}
        lazy
        first={first}
        onPage={onPage}
        onSort={onSort}
        loading={loading}
        footer={footer}
        selectionMode="single"
        selection={selectedBook}
        onSelectionChange={(e) => onSelectionChange(e)}
        onRowSelect={onRowSelect}
        header={header}
        sortField={sortField}
        sortOrder={sortOrder}
      >

        <Column field="title" header="Title" sortable />
        <Column field="authorNames" header="Authors" sortable />
        <Column field="genreNames" header="Genres" sortable />
        <Column field="publisherName" header="Publisher" sortable />
      </DataTable>

      <Dialog visible={displayDialog} width="300px" header="Book Details" modal footer={dialogFooter} onHide={() => handleHide()}>
        {
          book
          && (
            <div className="p-grid p-fluid">
              <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="title">Title</label></div>
              <div className="p-col-8" style={{ padding: '.5em' }}>
                <InputText id="title" required onChange={(e) => handleChange(e, 'title')} value={book.title} />
              </div>
              <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="authors">Authors</label></div>
              <div className="p-col-8" style={{ padding: '.5em' }}>
                <MultiSelect options={allAuthors} id="authors" onChange={(e) => handleChange(e, 'authors')} value={book.authors} filter />
              </div>
              <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="genres">Genres</label></div>
              <div className="p-col-8" style={{ padding: '.5em' }}>
                <MultiSelect options={allGenres} id="genres" onChange={(e) => handleChange(e, 'genres')} value={book.genres} filter />
              </div>
              <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="publishers">Publishers</label></div>
              <div className="p-col-8" style={{ padding: '.5em' }}>
                <Dropdown options={allPublishers} id="publishers" onChange={(e) => handleChange(e, 'publisher')} value={book.publisher} filter />
              </div>
            </div>
          )
        }

      </Dialog>
    </div>
  );
};

export default BooksRender;
