import { combineReducers } from 'redux';
import {
    READ_GENRES_SUCCESFUL, READ_GENRES_PENDING, READ_GENRES_FAILURE,
    CREATE_GENRES_SUCCESFUL, CREATE_GENRES_PENDING, CREATE_GENRES_FAILURE,
    UPDATE_GENRES_SUCCESFUL, UPDATE_GENRES_PENDING, UPDATE_GENRES_FAILURE,
    DELETE_GENRES_SUCCESFUL, DELETE_GENRES_PENDING, DELETE_GENRES_FAILURE
} from '../actions/actionTypes'

const initialState = {
    genres: [],
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

const genreReducer = (state = initialState, action) => {
    let newGenres = [...state.genres];
    switch (action.type) {
        case READ_GENRES_SUCCESFUL:
            return { ...state, paging: action.data.pop(), genres: action.data, loading: false }
        case READ_GENRES_PENDING:
            return { ...state, loading: true }
        case READ_GENRES_FAILURE:
            return { ...state, loading: false, error: action.error }

        case CREATE_GENRES_SUCCESFUL:
            newGenres.push(action.data);
            return { ...state, genres: newGenres, loading: false }
        case CREATE_GENRES_PENDING:
            return { ...state, loading: true }
        case CREATE_GENRES_FAILURE:
            return { ...state, loading: false, error: action.error }

        case UPDATE_GENRES_SUCCESFUL:
            //newGenres[newGenres.findIndex(genre => action.data._id === genre._id)] = action.data;
            return { ...state, genres: newGenres, loading: false }
        case UPDATE_GENRES_PENDING:
            return { ...state, loading: true }
        case UPDATE_GENRES_FAILURE:
            return { ...state, loading: false, error: action.error }

        case DELETE_GENRES_SUCCESFUL:
            // let index = newGenres.findIndex(genre => action.data._id === genre._id);
            // newGenres = newGenres.filter((_, i) => i !== index);
            return { ...state, genres: newGenres, loading: false }
        case DELETE_GENRES_PENDING:
            return { ...state, loading: true }
        case DELETE_GENRES_FAILURE:
            return { ...state, loading: false, error: action.error }

        default:
            return state;
    }
}

export default combineReducers({
    genre: genreReducer
});