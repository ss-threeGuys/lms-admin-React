import actionBuilder from "./action.builder";


export const State = {
    STARTED     : 'STATE:STARTED',
    FULFILLED   : 'STATE:FULFILLED',
    REJECTED    : 'STATE:REJECTED',
}

export const Target = {
    BOOK        : 'TARGET:BOOK',
    PUBLISHER   : 'TARGET:PUBLISHER',
    AUTHOR      : 'TARGET:AUTHOR',
    GENRE       : 'TARGET:GENRE',
    BRANCH      : 'TARGET:BRANCH',
    BORROWER    : 'TARGET:BORROWER',
}

export const Task = {
    SETPROPS    : 'TASK:SETPROPS',
    CREATE      : 'TASK:CREATE',
    RETRIEVE    : 'TASK:RETRIEVE',
    UPDATE      : 'TASK:UPDATE',
    DELETE      : 'TASK:DELETE',
}


export function promiseStart(target, task, requestPayload) {
  return actionBuilder(target, task, State.STARTED, requestPayload, null, null);
}

export function promiseFulfilled(target, task, requestPayload, response) {
    return actionBuilder(target, task, State.FULFILLED, requestPayload, response, null);
}

export function promiseRejected(target, task, requestPayload, error) {
    return actionBuilder(target, task, State.REJECTED, requestPayload, null, error);
}

export function doTask(target, task) {
    console.log(target, task);
    return (requestPayload) => {
        console.log(target, task);
        return actionBuilder(target, task, State.STARTED, requestPayload, null, null);
    }
}