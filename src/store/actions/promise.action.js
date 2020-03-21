import { promiseStart, promiseFulfilled, promiseRejected } from '.';

export default class PromiseAction {

    constructor(target, task, promise, requestPayload = null) {
        
        this.target = target;
        this.task = task;
        this.promise = promise;
        this.requestPayload = requestPayload;
    }

    thunk(dispatch, getState) {
        this.dispatch = dispatch;
        this.promise
            .then( response => this.onFulfilled(response) )
            .catch( error => this.onRejected(error) );

        this.dispatch(promiseStart(this.target, this.task, this.promise, this.requestPayload));
    }

    onFulfilled(response) {
        this.dispatch(promiseFulfilled(this.target, this.task, this.requestPayload, response));
    }

    onRejected(error) {
        this.dispatch(promiseRejected(this.target, this.task, this.requestPayload, error));
    }

}