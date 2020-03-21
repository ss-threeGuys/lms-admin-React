import {
    READ_BORROWERS_SUCCESFUL, READ_BORROWERS_PENDING, READ_BORROWERS_FAILURE,
    CREATE_BORROWERS_SUCCESFUL, CREATE_BORROWERS_PENDING, CREATE_BORROWERS_FAILURE,
    UPDATE_BORROWERS_SUCCESFUL, UPDATE_BORROWERS_PENDING, UPDATE_BORROWERS_FAILURE,
    DELETE_BORROWERS_SUCCESFUL, DELETE_BORROWERS_PENDING, DELETE_BORROWERS_FAILURE
} from '../actions/actionTypes';
import axios from 'axios';
import { environment } from '../../environments/environment';

const crudUrls = {
    create: 'http://' + environment.crudUrls.baseHost + ':'
        + environment.crudUrls.basePort
        + environment.crudUrls.prefix
        + environment.crudUrls.borrower.create.url,
    retrieve: 'http://' + environment.crudUrls.baseHost + ':'
        + environment.crudUrls.basePort
        + environment.crudUrls.prefix
        + environment.crudUrls.borrower.retrieve.url,
    update: 'http://' + environment.crudUrls.baseHost + ':'
        + environment.crudUrls.basePort
        + environment.crudUrls.prefix
        + environment.crudUrls.borrower.update.url,
    delete: 'http://' + environment.crudUrls.baseHost + ':'
        + environment.crudUrls.basePort
        + environment.crudUrls.prefix
        + environment.crudUrls.borrower.delete.url,
};


const params = {
    create: environment.crudUrls.borrower.create.param,
    retrieve: environment.crudUrls.borrower.retrieve.param,
    update: environment.crudUrls.borrower.update.param,
    delete: environment.crudUrls.borrower.delete.param,
}

export const readBorrowers = (sortField, sortOrder, currentPage, pageSize) => dispatch => {
    dispatch(_readBorrowersStarted());
    return axios.get(crudUrls.retrieve + '/paging', {
        params: {
            sortField,
            sortOrder,
            currentPage,
            pageSize
        }
    }).then(res => {
        dispatch(_readBorrowersSuccess(res));
    }).catch(error => {
        dispatch(_readBorrowersFailed(error));
    });
}

export const createBorrower = (borrower) => dispatch => {
    dispatch(_createBorrowersStarted());
    return axios.post(crudUrls.create, borrower)
        .then(() => {
            dispatch(_createBorrowersSuccess(borrower));
        })
        .catch(error => {
            dispatch(_createBorrowersFailed(error));
        });
}

export const updateBorrower = (borrower) => dispatch => {
    dispatch(_updateBorrowersStarted());
    let url = crudUrls.update;
    for (let param of Object.keys(params.update)) {
        url = url.replace(':' + param, borrower[params.update[param]]);
    }
    return axios.put(url, borrower)
        .then(() => {
            dispatch(_updateBorrowersSuccess(borrower));
        })
        .catch(error => {
            console.log(error)
            dispatch(_updateBorrowersFailed(error))
        });
}

export const deleteBorrower = (borrower) => dispatch => {
    dispatch(_deleteBorrowersStarted());
    let url = crudUrls.delete;
    for (let param of Object.keys(params.delete)) {
        url = url.replace(':' + param, borrower[params.delete[param]]);
    }
    return axios.delete(url, borrower)
        .then(() => {
            dispatch(_deleteBorrowersSuccess(borrower));
        })
        .catch(error => {
            dispatch(_deleteBorrowersFailed(error))
        });
}

const _readBorrowersSuccess = (res) => {
    return {
        type: READ_BORROWERS_SUCCESFUL,
        data: res.data
    };
}

const _readBorrowersStarted = () => {
    return {
        type: READ_BORROWERS_PENDING
    };
}

const _readBorrowersFailed = (error) => {
    return {
        type: READ_BORROWERS_FAILURE,
        error
    }
}

const _createBorrowersSuccess = (res) => {
    return {
        type: CREATE_BORROWERS_SUCCESFUL,
        data: res.data
    };
}

const _createBorrowersStarted = () => {
    return {
        type: CREATE_BORROWERS_PENDING
    };
}

const _createBorrowersFailed = (error) => {
    return {
        type: CREATE_BORROWERS_FAILURE,
        error
    }
}

const _updateBorrowersSuccess = (res) => {
    return {
        type: UPDATE_BORROWERS_SUCCESFUL,
        data: res.data
    };
}

const _updateBorrowersStarted = () => {
    return {
        type: UPDATE_BORROWERS_PENDING
    };
}

const _updateBorrowersFailed = (error) => {
    return {
        type: UPDATE_BORROWERS_FAILURE,
        error
    }
}

const _deleteBorrowersSuccess = (res) => {
    return {
        type: DELETE_BORROWERS_SUCCESFUL,
        data: res.data
    };
}

const _deleteBorrowersStarted = () => {
    return {
        type: DELETE_BORROWERS_PENDING
    };
}

const _deleteBorrowersFailed = (error) => {
    return {
        type: DELETE_BORROWERS_FAILURE,
        error
    }
}