import {
    READ_BOOKS_FAILURE, READ_BOOKS_SUCCESFUL, READ_BOOKS_PENDING
} from './actionTypes';
import axios from 'axios';
const BASEURL = 'http://localhost:3000/admin/books/';


export const readBooks = (sortField, sortOrder, curPage, pageSize) => dispatch => {
    dispatch(_readBooksStarted());
    return axios.get(
        `${BASEURL}paging?sortField=${sortField}&sortOrder=${sortOrder}&currentPage=${curPage}&pageSize=${pageSize}`)
        .then(res => {
            dispatch(_readBooksSuccess(res));
        })
        .catch((error) => {
            console.log(error);
            dispatch(_readBooksFailed(error));
        });
};

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

// const _addBooksSuccess = (res) => {
//     return {
//         type: ADD_BOOKS_SUCCESFUL,
//         data: res.data
//     };
// }

// const _addBooksFailed = (error) => {
//     return {
//         type: ADD_BOOKS_FAILURE,
//         error
//     };
// }

// const _addBooksStarted = () => {
//     return {
//         type: ADD_BOOKS_PENDING
//     };
// }

// const _updateBooksSuccess = () => {
//     return {
//         type: UPDATE_BOOKS_SUCCESFUL
//     };
// }

// const _updateBooksFailed = (error) => {
//     return {
//         type: UPDATE_BOOKS_FAILURE,
//         error
//     };
// }

// const _updateBooksStarted = () => {
//     return {
//         type: UPDATE_BOOKS_PENDING
//     };
// }

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

