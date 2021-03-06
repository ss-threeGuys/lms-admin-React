import React from 'react';
import { connect } from 'react-redux';
import {
  readBooks, addBooks, updateBooks, deleteBooks, readAllAuthors, readAllGenres, readAllPublishers,
} from '../../actions/bookActions';
import BooksRender from '../BooksRender';
import { Target } from '../../reducers';

export class Books extends React.Component {
  constructor(props) {
    super(props);
    this.componentName = 'Books';
    this.state = {
      first: 0,
      displayDialog: false,
      valid: false,
    };
  }

  getAllAuthors = () => {
    readAllAuthors()
      .then((_authors) => {
        this.setState(
          { authors: _authors.data.map((author) => ({ label: author.name, value: author._id })) },
        );
      });
  }

  getAllGenres = () => {
    readAllGenres()
      .then((_genres) => {
        this.setState(
          { genres: _genres.data.map((genre) => ({ label: genre.name, value: genre._id })) },
        );
      });
  }

  getAllPublishers = () => {
    readAllPublishers()
      .then((_publishers) => {
        this.setState({
          publishers: _publishers.data.map(
            (publisher) => ({ label: publisher.name, value: publisher._id }),
          ),
        });
      });
  }


  componentDidMount = () => {
    this.props.dispatch(readBooks(
      this.props.sortField, this.props.sortOrder, this.props.currentPage, this.props.pageSize
    ));
    this.getAllPublishers();
    this.getAllGenres();
    this.getAllAuthors();
  }

  onBookSelect = (e) => {
    this.newBook = false;
    this.setState({
      displayDialog: true,
      valid: true,
      book: {
        _id: e.data._id,
        title: e.data.title,
        authors: e.data.authorIds,
        genres: e.data.genreIds,
        publisher: e.data.publisherId,
      },
    });
  }

  onPage = (event) => {
    const currentPage = 1 + (event.first / this.props.pageSize);
    this.props.dispatch(readBooks(
      this.props.sortField, this.props.sortOrder, currentPage, this.props.pageSize
    ));
    this.setState({ first: event.first });
  }

  onSort = (event) => {
    const sortFields = {
      title: 'title',
      authorNames: 'authors',
      genreNames: 'genres',
      publisherName: 'publisher',
    };

    const sortField = sortFields[event.sortField];
    const { sortOrder } = event;

    this.props.dispatch(readBooks(
      sortField, sortOrder, this.props.currentPage, this.props.pageSize
    ));
  }

  addNew = () => {
    this.newBook = true;
    this.setState({
      book: {
        title: '', authors: [], genres: [], publisher: '',
      },
      valid: false,
      displayDialog: true,
    });
  }

  save = () => {
    if (this.newBook) {
      this.props.dispatch(addBooks(this.state.book))
        .then(() => {
          this.props.dispatch(readBooks(
            this.props.sortField, this.props.sortOrder, this.props.currentPage, this.props.pageSize
          ));
        });
    } else {
      this.props.dispatch(updateBooks(this.state.book))
        .then(() => {
          this.props.dispatch(readBooks(
            this.props.sortField, this.props.sortOrder, this.props.currentPage, this.props.pageSize
          ));
        });
    }

    this.setState({ selectedBook: null, book: null, displayDialog: false });
  }

  deleteBook = () => {
    this.props.dispatch(deleteBooks(this.state.book._id))
      .then(() => this.props.dispatch(readBooks(
        this.props.sortField, this.props.sortOrder, this.props.currentPage, this.props.pageSize
      )));
    this.setState({
      selectedBook: null,
      book: null,
      displayDialog: false,
    });
  }

  updateProperty = (property, value) => {
    const { book } = this.state;
    book[property] = value;
    this.setState({ book });
    if (property === 'title') {
      this.setState({ valid: value.length > 1 });
    }
  }

  mapBooksToOutputBook(books) {
    const outputBooks = [];
    books.forEach((book) => {
      outputBooks.push({
        _id: book._id,
        title: book.title,
        authorNames: book.authors.map((author) => author.name).join(', '),
        authorIds: book.authors.map((author) => author._id),
        genreNames: book.genres.map((genre) => genre.name).join(', '),
        genreIds: book.genres.map((genre) => genre._id),
        publisherName: book.publisher ? book.publisher.name : null,
        publisherId: book.publisher ? book.publisher._id : null,
      });
    });
    return outputBooks;
  }

  render() {
    return (
      <div>
        <BooksRender
          mapBooksToOutputBook={this.mapBooksToOutputBook}
          books={this.props.books}
          addNew={this.addNew}
          deleteBook={this.deleteBook}
          valid={this.state.valid}
          save={this.save}
          loading={this.props.loading}
          componentName={this.componentName}
          pageSize={this.props.pageSize}
          totalRecords={this.props.count}
          first={this.state.first}
          onPage={this.onPage}
          onSort={this.onSort}
          selectedBook={this.state.selectedBook}
          onSelectionChange={(e) => this.setState({ selectedBook: e.value })}
          onRowSelect={(e) => this.onBookSelect(e)}
          displayDialog={this.state.displayDialog}
          handleHide={() => this.setState({ displayDialog: false })}
          book={this.state.book}
          handleChange={(e, property) => { this.updateProperty(property, e.target.value); }}
          allPublishers={this.state.publishers}
          allAuthors={this.state.authors}
          allGenres={this.state.genres}
          newBook={this.newBook}
          sortFieldProp={this.props.sortField}
          sortOrder={this.props.sortOrder}
        />
      </div >

    );
  }
}

export const mapStatetoProps = (state) => {

  return {
    books: state[Target.BOOK].book.books,
    pageSize: state[Target.BOOK].book.paging.__paging.pageSize,
    count: state[Target.BOOK].book.paging.__paging.count,
    currentPage: state[Target.BOOK].book.paging.__paging.currentPage,
    loading: state[Target.BOOK].book.loading,
    sortField: state[Target.BOOK].book.paging.__paging.sortField,
    sortOrder: parseInt(state[Target.BOOK].book.paging.__paging.sortOrder),

  };
};

export default connect(mapStatetoProps)(Books);