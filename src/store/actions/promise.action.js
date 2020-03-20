import store from '../../store';
import { promiseStart, promiseFulfilled, promiseRejected } from '.';

export default class PromiseAction {

    constructor(target, task, promise, requestPayload = null) {
        this.store = store;
        this.target = target;
        this.task = task;
        this.promise = promise;
        this.requestPayload = requestPayload;
    }

    start() {

        this.promise
            .then( response => this.onFulfilled(response) )
            .catch( error => this.onRejected(error) );

        this.store.dispatch(promiseStart(this.target, this.task, this.promise, this.requestPayload));
    }

    onFulfilled(response) {
        this.store.dispatch(promiseFulfilled(this.target, this.task, this.requestPayload, response));
    }

    onRejected(error) {
        this.store.dispatch(promiseRejected(this.target, this.task, this.requestPayload, error));
    }

}