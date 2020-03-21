import actionBuilder from "./action.builder";


export const PromiseState = {
    STARTED = 'PROMISE:STARTED',
    FULFILLED = 'PROMISE:FULFILLED',
    REJECTED = 'PROMISE:REJECTED',
}

export function promiseStart(target, task, requestPayload) {
  return actionBuilder(target, task, PromiseState.STARTED, requestPayload, null, null);
}

export function promiseFulfilled(target, task, requestPayload, response) {
    return actionBuilder(target, task, PromiseState.STARTED, requestPayload, response, null);
}

export function promiseRejected(target, task, requestPayload, error) {
    return actionBuilder(target, task, PromiseState.STARTED, requestPayload, null, error);
}