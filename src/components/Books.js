import React from 'react';
import { connect } from 'react-redux';
import { readBooks, addBooks, readAllAuthors, readAllGenres, readAllPublishers } from '../store/actions/bookActions'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown'


export class Books extends React.Component {


    constructor(props) {
        super(props);
        this.componentName = 'Books'
        this.state = {
            first: 0,
            displayDialog: false
        }



    }

    getAllAuthors() {
        readAllAuthors()
            .then(_authors => {
                this.setState({ authors: _authors.data.map(author => ({ label: author.name, value: author._id })) })

            })
    }

    getAllGenres() {
        readAllGenres()
            .then(_genres => {
                this.setState({ genres: _genres.data.map(genre => ({ label: genre.name, value: genre._id })) })
            })
    }

    getAllPublishers() {
        readAllPublishers()
            .then(_publishers => {
                this.setState({ publishers: _publishers.data.map(publisher => ({ label: publisher.name, value: publisher._id })) })
            })
    }

    componentDidMount() {
        console.log('in Component Did Mount')

        this.props.dispatch(readBooks('title', 1, 1, 10));
        this.getAllPublishers();
        this.getAllGenres();
        this.getAllAuthors();

    }

    onPage = (event) => {

        const currentPage = 1 + (event.first / this.props.pageSize)
        this.props.dispatch(readBooks('title', 1, currentPage, this.props.pageSize))
        this.setState({ first: event.first })

    }


    addNew = () => {
        this.newBook = true;
        this.setState({
            book: { title: '', authors: [], genres: [], publisher: '' },
            displayDialog: true
        });
    }

    save = () => {
        console.log("this.state.book: " + JSON.stringify(this.state.book));
        if (this.newBook) {
            this.props.dispatch(addBooks(this.state.book))
                .then(() => {
                    this.props.dispatch(readBooks('title', 1, this.props.currentPage, this.props.pageSize));
                })
        }
        else {
            // this.props.dispatch(updateBooks(this.state.book))
        }


        this.setState({ selectedBook: null, book: null, displayDialog: false });
    }

    updateProperty = (property, value) => {
        let book = this.state.book;
        book[property] = value;
        this.setState({ book: book })
    }

    mapBooksToOutputBook(books) {
        const outputBooks = [];
        books.forEach(book => {
            outputBooks.push({
                _id: book._id,
                title: book.title,
                authorNames: book.authors.map(author => author.name).join(', '),
                authorIds: book.authors.map(author => author._id),
                genreNames: book.genres.map(genre => genre.name).join(', '),
                genreIds: book.genres.map(genre => genre._id),
                publisherName: book.publisher ? book.publisher.name : null,
                publisherId: book.publisher ? book.publisher._id : null
            })
        })
        return outputBooks;
    }

    render() {

        const outputBooks = this.mapBooksToOutputBook(this.props.books);
        // console.log("outputBoks: " + JSON.stringify(outputBooks))
        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Delete" icon="pi pi-times" onClick={this.delete} />
            <Button label="Save" icon="pi pi-check" onClick={this.save} />
        </div>;

        if (this.props.loading) {
            return <p>loading...</p>
        }


        return (


            <div>
                {this.componentName}
                <DataTable value={outputBooks} paginator={true} rows={this.props.pageSize} totalRecords={this.props.count}
                    lazy={true} first={this.state.first} onPage={this.onPage} loading={this.props.loading} footer={footer}>

                    <Column field="title" header="Title" />
                    <Column field="authorNames" header="Authors" />
                    <Column field="genreNames" header="Genres" />
                    <Column field="publisherName" header="Publisher" />
                </DataTable>

                <Dialog visible={this.state.displayDialog} width="300px" header="Book Details" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.book &&

                        <div className="p-grid p-fluid">
                            <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="title">Title</label></div>
                            <div className="p-col-8" style={{ padding: '.5em' }}>
                                <InputText id="title" onChange={(e) => { this.updateProperty('title', e.target.value) }} value={this.state.book.title} />
                            </div>
                            <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="authors">Authors</label></div>
                            <div className="p-col-8" style={{ padding: '.5em' }}>
                                <MultiSelect options={this.state.authors} id="authors" onChange={(e) => { this.updateProperty('authors', e.target.value) }} value={this.state.book.authors}  filter={true} />
                            </div>
                            <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="genres">Genres</label></div>
                            <div className="p-col-8" style={{ padding: '.5em' }}>
                                <MultiSelect options={this.state.genres} id="genres" onChange={(e) => { this.updateProperty('genres', e.target.value) }} value={this.state.book.genres} filter={true} />
                            </div>
                            <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="publishers">Publishers</label></div>
                            <div className="p-col-8" style={{ padding: '.5em' }}>
                                <Dropdown options={this.state.publishers} id="publishers" onChange={(e) => { this.updateProperty('publisher', e.target.value) }} value={this.state.book.publisher} filter={true} />
                            </div>
                        </div>

                    }
                </Dialog>
            </div>

        );
    }

}

export const mapStatetoProps = (state) => {
    console.log(state)
    return {
        books: state.booksReducer.book.books,
        pageSize: state.booksReducer.book.paging.__paging.pageSize,
        count: state.booksReducer.book.paging.__paging.count,
        loading: state.booksReducer.book.loading
    }
}

export default connect(mapStatetoProps)(Books)