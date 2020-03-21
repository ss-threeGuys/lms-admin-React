import { combineReducers } from 'redux';

import authorsReducer from './authorsReducer';
import booksReducer from './booksReducer';
import genresReducer from './genresReducer';
import publishersReducer from './publishersReducer';
import branchesReducer from './branchesReducer';
import borrowersReducer from './borrowersReducer';

export const Target = {
    BOOK        : 'TARGET:BOOK',
    PUBLISHER   : 'TARGET:PUBLISHER',
    AUTHOR      : 'TARGET:AUTHOR',
    GENRE       : 'TARGET:GENRE',
    BRANCH      : 'TARGET:BRANCH',
    BORROWER    : 'TARGET:BORROWER',
}

export const Task = {
    CREATE      : 'TASK:CREATE',
    RETRIEVE    : 'TASK:RETRIEVE',
    UPDATE      : 'TASK:UPDATE',
    DELETE      : 'TASK:DELETE'
}

export default combineReducers({
    [Target.AUTHOR]     : authorsReducer,
    [Target.BOOK]       : booksReducer,
    [Target.GENRE]      : genresReducer,
    [Target.PUBLISHER]  : publishersReducer,
    [Target.BRANCH]     : branchesReducer,
    [Target.BORROWER]   : borrowersReducer,
});