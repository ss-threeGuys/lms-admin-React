import {
    READ_BOOKS_FAILURE, READ_BOOKS_SUCCESFUL, READ_BOOKS_PENDING,
    ADD_BOOKS_FAILURE, ADD_BOOKS_SUCCESFUL, ADD_BOOKS_PENDING,
    UPDATE_BOOKS_FAILURE, UPDATE_BOOKS_SUCCESFUL, UPDATE_BOOKS_PENDING
} from './actionTypes';
import axios from 'axios';
const BASEURL = 'http://localhost:3000/admin/';


export const readAllAuthors = () => {
    return axios.get(BASEURL + 'authors')
}

export const readAllGenres = () => {
    return axios.get(BASEURL + 'genres')
}

export const readAllPublishers = () => {
    return axios.get(BASEURL + 'publishers')
}

export const readBooks = (sortField, sortOrder, curPage, pageSize) => dispatch => {
    dispatch(_readBooksStarted());
    return axios.get(
        `${BASEURL}books/paging?sortField=${sortField}&sortOrder=${sortOrder}&currentPage=${curPage}&pageSize=${pageSize}`)
        .then(res => {
            dispatch(_readBooksSuccess(res));
        })
        .catch((error) => {
            console.log(error);
            dispatch(_readBooksFailed(error));
        });
};

export const addBooks = (book) => dispatch => {
    dispatch(_addBooksStarted());
    return axios.post(BASEURL + 'books', book)
    .then(res => dispatch(_addBooksSuccess(res)))
    .catch(error => dispatch(_addBooksFailed(error)));
}

export const updateBooks = (book) => dispatch => {
    dispatch(_updateBooksStarted());
    return axios.put(BASEURL + 'books/' + book._id, book )
    .then(() => dispatch(_updateBooksSuccess()))
    .catch((error) => dispatch(_updateBooksFailed(error)));

}

const _readBooksSuccess = (res) => {
    return {
        type: READ_BOOKS_SUCCESFUL,
        data: res.data
    };
}

const _readBooksFailed = (error) => {
    return {
        type: READ_BOOKS_FAILURE,
        error
    };
}

const _readBooksStarted = () => {
    return {
        type: READ_BOOKS_PENDING
    };
}

const _addBooksSuccess = (res) => {
    return {
        type: ADD_BOOKS_SUCCESFUL,
        data: res.data
    };
}

const _addBooksFailed = (error) => {
    return {
        type: ADD_BOOKS_FAILURE,
        error
    };
}

const _addBooksStarted = () => {
    return {
        type: ADD_BOOKS_PENDING
    };
}

const _updateBooksSuccess = () => {
    return {
        type: UPDATE_BOOKS_SUCCESFUL
    };
}

const _updateBooksFailed = (error) => {
    return {
        type: UPDATE_BOOKS_FAILURE,
        error
    };
}

const _updateBooksStarted = () => {
    return {
        type: UPDATE_BOOKS_PENDING
    };
}

// const _deleteBooksSuccess = () => {
//     return {
//         type: DELETE_BOOKS_SUCCESFUL
//     };
// }

// const _deleteBooksFailed = (error) => {
//     return {
//         type: DELETE_BOOKS_FAILURE,
//         error
//     };
// }

// const _deleteBooksStarted = () => {
//     return {
//         type: DELETE_BOOKS_PENDING
//     };
// }

