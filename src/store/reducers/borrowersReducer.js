import { combineReducers } from 'redux';
import {
    READ_BORROWERS_SUCCESFUL, READ_BORROWERS_PENDING, READ_BORROWERS_FAILURE,
    CREATE_BORROWERS_SUCCESFUL, CREATE_BORROWERS_PENDING, CREATE_BORROWERS_FAILURE,
    UPDATE_BORROWERS_SUCCESFUL, UPDATE_BORROWERS_PENDING, UPDATE_BORROWERS_FAILURE,
    DELETE_BORROWERS_SUCCESFUL, DELETE_BORROWERS_PENDING, DELETE_BORROWERS_FAILURE
} from '../actions/actionTypes'

const initialState = {
    borrowers: [],
    paging: {
        __paging: {
            currentPage: 1,
            pageSize: 5,
            totalPages: null,
            prevPage: null,
            nextPage: 2,
            prev: false,
            next: null,
            count: null,
            sortField: "name",
            sortOrder: 1
        }
    },
    error: null,
    loading: false
}

const borrowerReducer = (state = initialState, action) => {
    let newBorrowers = [...state.borrowers];
    switch (action.type) {
        case READ_BORROWERS_SUCCESFUL:
            return { ...state, paging: action.data.pop(), borrowers: action.data, loading: false }
        case READ_BORROWERS_PENDING:
            return { ...state, loading: true }
        case READ_BORROWERS_FAILURE:
            return { ...state, loading: false, error: action.error }

        case CREATE_BORROWERS_SUCCESFUL:
            newBorrowers.push(action.data);
            return { ...state, borrowers: newBorrowers, loading: false }
        case CREATE_BORROWERS_PENDING:
            return { ...state, loading: true }
        case CREATE_BORROWERS_FAILURE:
            return { ...state, loading: false, error: action.error }

        case UPDATE_BORROWERS_SUCCESFUL:
            return { ...state, borrowers: newBorrowers, loading: false }
        case UPDATE_BORROWERS_PENDING:
            return { ...state, loading: true }
        case UPDATE_BORROWERS_FAILURE:
            return { ...state, loading: false, error: action.error }

        case DELETE_BORROWERS_SUCCESFUL:
            return { ...state, borrowers: newBorrowers, loading: false }
        case DELETE_BORROWERS_PENDING:
            return { ...state, loading: true }
        case DELETE_BORROWERS_FAILURE:
            return { ...state, loading: false, error: action.error }

        default:
            return state;
    }
}

export default combineReducers({
    borrower: borrowerReducer
});