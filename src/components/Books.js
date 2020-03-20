import React from 'react';
import { connect } from 'react-redux';
import { readBooks } from '../store/actions/bookActions'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


export class Books extends React.Component {


    constructor(props) {
        super(props);
        this.componentName = 'Books'
        this.state = {
            first: 0,
            
        }
        this.onPage = this.onPage.bind(this);


    }

    componentDidMount() {
        console.log('in Component Did Mount')
        console.log(this.props)
        this.props.dispatch(readBooks('title', 1, 1, 10));
    }

    onPage(event) {
        console.log(event);
        const currentPage = 1 + (event.first/this.props.pageSize)
        this.props.dispatch(readBooks('title', 1, currentPage, this.props.pageSize))
        this.setState({first : event.first})
    }

    mapBooksToOutputBook(books) {
        const outputBooks = [];
        books.forEach(book => {
            outputBooks.push({
                _id : book._id,
                title : book.title,
                authorNames : book.authors.map(author => author.name).join(', '),
                authorIds : book.authors.map(author => author._id),
                genreNames : book.genres.map(genre => genre.name).join(', '),
                genreIds : book.genres.map(genre => genre._id),
                publisherName : book.publisher ? book.publisher.name : null,
                publisherId : book.publisher ? book.publisher._id : null
            })
        })
        return outputBooks;
    }
    
    render() {

        const outputBooks = this.mapBooksToOutputBook(this.props.books);
    
        if (this.props.loading) {
            return <p>loading...</p>
        }


        return (


            <div>
                {this.componentName}
                <DataTable value={outputBooks} paginator={true} rows={this.props.pageSize} totalRecords={this.props.count}
                    lazy={true} first={this.state.first} onPage={this.onPage} loading={this.props.loading}>

                    <Column field="title" header="Title" />
                    <Column field="authorNames" header="Authors" />
                    <Column field="genreNames" header="Genres" />
                    <Column field="publisherName" header="Publisher" />
                </DataTable>
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