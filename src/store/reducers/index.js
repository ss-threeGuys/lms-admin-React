import { combineReducers } from 'redux';

import authorsReducer from './authorsReducer';
import booksReducer from './booksReducer';
import genresReducer from './genresReducer';
import publishersReducer from './publishersReducer';
import branchesReducer from './branchesReducer';
import borrowersReducer from './borrowersReducer';

export default rootReducer = combineReducers({
    authorsReducer,
    booksReducer,
    genresReducer,
    publishersReducer,
    branchesReducer,
    borrowersReducer
});