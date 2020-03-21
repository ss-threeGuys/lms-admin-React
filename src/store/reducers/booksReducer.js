import { combineReducers } from 'redux';
import {
    READ_BOOKS_SUCCESFUL, READ_BOOKS_PENDING, READ_BOOKS_FAILURE,
    ADD_BOOKS_FAILURE, ADD_BOOKS_SUCCESFUL, ADD_BOOKS_PENDING,
    UPDATE_BOOKS_FAILURE, UPDATE_BOOKS_SUCCESFUL, UPDATE_BOOKS_PENDING
} from '../actions/actionTypes';
const initialState = {
    books: [
        {
            _id: null,
            title: null,
            authors: [],
            genres: [],
            publisher: {}
        }
    ],
    paging: {
        __paging: {
            currentPage: 1,
            pageSize: null,
            totalPages: null,
            prevPage: null,
            nextPage: 2,
            prev: false,
            next: null,
            count: null,
            sortField: "title",
            sortOrder: 1
        }
    },
    error: null,
    loading: false
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_BOOKS_SUCCESFUL:
            return { ...state, paging: action.data.pop(), books: action.data, loading: false };
        case ADD_BOOKS_SUCCESFUL:
        case UPDATE_BOOKS_SUCCESFUL:
            return { ...state, loading: false };
        case READ_BOOKS_PENDING:
        case ADD_BOOKS_PENDING:
        case UPDATE_BOOKS_PENDING:
            return { ...state, loading: true };
        case READ_BOOKS_FAILURE:
        case ADD_BOOKS_FAILURE:
        case UPDATE_BOOKS_FAILURE:
            return { ...state, error: action.error, loading: false };

        default:
            return state;
    }
}

const reducer = combineReducers({
    book: bookReducer
});

export default reducer;
