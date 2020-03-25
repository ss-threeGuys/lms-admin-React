import columnMap from "../domains/author.map";
import { Target, Task } from ".";
import { State } from "../actions";
import log from "../logger/log";

let initialState = {
  data: [],
  selected: null,
  loading: false,
  paging: {
    first: 0,
    rows: 10,
    totalRecords: 0
  },
  sorting: {
    sortField: null,
    sortOrder: null
  }
};

if (columnMap[0]) {
  initialState = {
    ...initialState,
    sorting: {
      sortField: columnMap[0].field,
      sortOrder: 1
    }
  };
}

export default function authorReducer(state = initialState, action) {
  log.debug("authorReducer(state = initialState, action)", state, action);

  if (action.target !== Target.AUTHOR)
    // Not my job
    return state;

  let newState = { ...state };
  switch (action.task) {
    case Task.SETPROPS:
      if (action.actionState === State.STARTED) {
        newState.props = { ...newState.props, ...action.requestPayload };
      }
      break;

    case Task.RETRIEVE:
      if (action.actionState === State.START) {
        newState.props = { ...newState.props };
        newState.props.reloadRequired = false;
        newState.props.loading = true;
      } else if (action.actionState === State.FULFILLED && action.payload) {
        newState.props = { ...newState.props };
        newState.props.value = [...action.payload.data];

        newState.props.paging = {
          first:
            (action.payload.paging.currentPage - 1) *
            action.payload.paging.pageSize,
          rows: action.payload.paging.pageSize,
          totalRecords: action.payload.paging.count
        };

        newState.props.sorting = {
          sortField: action.payload.paging.sortField,
          sortOrder: action.payload.paging.sortOrder
        };
        newState.props.loading = false;
        newState.props.reloadRequired = false;
      }
      break;

    case Task.CREATE:
      if (action.actionState === State.START) {
        newState.props = { ...newState.props };
        newState.props.loading = true;
      }

      if (action.actionState === State.FULFILLED) {
        log.trace(Task.CREATE, action);
        newState.props = { ...newState.props };
        newState.props.reloadRequired = true;
        newState.props.value = [];
      }
      break;

    case Task.UPDATE:
      if (action.actionState === State.START) {
        newState.props = { ...newState.props };
        newState.props.loading = true;
      }

      if (action.actionState === State.FULFILLED) {
        log.trace(Task.UPDATE, action);
        newState.props = { ...newState.props };
        newState.props.reloadRequired = true;
        newState.props.value = [];
      }
      break;

    case Task.DELETE:
      if (action.actionState === State.START) {
        newState.props = { ...newState.props };
        newState.props.loading = true;
      }

      if (action.actionState === State.FULFILLED) {
        log.trace(Task.DELETE, action);
        newState.props = { ...newState.props };
        newState.props.reloadRequired = true;
        newState.props.value = [];
      }
      break;
    default:
      return newState;
  }
  return newState;
}
