import {
    READ_GENRES_SUCCESFUL, READ_GENRES_PENDING, READ_GENRES_FAILURE,
    CREATE_GENRES_SUCCESFUL, CREATE_GENRES_PENDING, CREATE_GENRES_FAILURE,
    UPDATE_GENRES_SUCCESFUL, UPDATE_GENRES_PENDING, UPDATE_GENRES_FAILURE,
    DELETE_GENRES_SUCCESFUL, DELETE_GENRES_PENDING, DELETE_GENRES_FAILURE
} from '../actions/actionTypes';
import axios from 'axios';
import { environment } from '../../environments/environment';

const crudUrls = {
    create: 'http://' + environment.crudUrls.baseHost + ':'
        + environment.crudUrls.basePort
        + environment.crudUrls.prefix
        + environment.crudUrls.genre.create.url,
    retrieve: 'http://' + environment.crudUrls.baseHost + ':'
        + environment.crudUrls.basePort
        + environment.crudUrls.prefix
        + environment.crudUrls.genre.retrieve.url,
    update: 'http://' + environment.crudUrls.baseHost + ':'
        + environment.crudUrls.basePort
        + environment.crudUrls.prefix
        + environment.crudUrls.genre.update.url,
    delete: 'http://' + environment.crudUrls.baseHost + ':'
        + environment.crudUrls.basePort
        + environment.crudUrls.prefix
        + environment.crudUrls.genre.delete.url,
};


const params = {
    create: environment.crudUrls.genre.create.param,
    retrieve: environment.crudUrls.genre.retrieve.param,
    update: environment.crudUrls.genre.update.param,
    delete: environment.crudUrls.genre.delete.param,
}

export const readGenres = (sortField, sortOrder, currentPage, pageSize) => dispatch => {
    dispatch(_readGenresStarted());
    return axios.get(crudUrls.retrieve + '/paging', {
        params: {
            sortField,
            sortOrder,
            currentPage,
            pageSize
        }
    }).then(res => {
        dispatch(_readGenresSuccess(res));
    }).catch(error => {
        dispatch(_readGenresFailed(error));
    });
}

export const createGenre = (genre) => dispatch => {
    dispatch(_createGenresStarted());
    return axios.post(crudUrls.create, genre)
        .then(() => {
            dispatch(_createGenresSuccess(genre));
        })
        .catch(error => {
            dispatch(_createGenresFailed(error));
        });
}

export const updateGenre = (genre) => dispatch => {
    dispatch(_updateGenresStarted());
    let url = crudUrls.update;
    for (let param of Object.keys(params.update)) {
        url = url.replace(':' + param, genre[params.update[param]]);
    }
    return axios.put(url, genre)
        .then(() => {
            dispatch(_updateGenresSuccess(genre));
        })
        .catch(error => {
            console.log(error)
            dispatch(_updateGenresFailed(error))
        });
}

export const deleteGenre = (genre) => dispatch => {
    dispatch(_deleteGenresStarted());
    let url = crudUrls.delete;
    for (let param of Object.keys(params.delete)) {
        url = url.replace(':' + param, genre[params.delete[param]]);
    }
    return axios.delete(url, genre)
        .then(() => {
            dispatch(_deleteGenresSuccess(genre));
        })
        .catch(error => {
            dispatch(_deleteGenresFailed(error))
        });
}

const _readGenresSuccess = (res) => {
    return {
        type: READ_GENRES_SUCCESFUL,
        data: res.data
    };
}

const _readGenresStarted = () => {
    return {
        type: READ_GENRES_PENDING
    };
}

const _readGenresFailed = (error) => {
    return {
        type: READ_GENRES_FAILURE,
        error
    }
}

const _createGenresSuccess = (res) => {
    return {
        type: CREATE_GENRES_SUCCESFUL,
        data: res.data
    };
}

const _createGenresStarted = () => {
    return {
        type: CREATE_GENRES_PENDING
    };
}

const _createGenresFailed = (error) => {
    return {
        type: CREATE_GENRES_FAILURE,
        error
    }
}

const _updateGenresSuccess = (res) => {
    return {
        type: UPDATE_GENRES_SUCCESFUL,
        data: res.data
    };
}

const _updateGenresStarted = () => {
    return {
        type: UPDATE_GENRES_PENDING
    };
}

const _updateGenresFailed = (error) => {
    return {
        type: UPDATE_GENRES_FAILURE,
        error
    }
}

const _deleteGenresSuccess = (res) => {
    return {
        type: DELETE_GENRES_SUCCESFUL,
        data: res.data
    };
}

const _deleteGenresStarted = () => {
    return {
        type: DELETE_GENRES_PENDING
    };
}

const _deleteGenresFailed = (error) => {
    return {
        type: DELETE_GENRES_FAILURE,
        error
    }
}