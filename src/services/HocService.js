import { Task } from "../reducers";
import { environment } from "../environments/environment";
import PromiseAction from "../actions/promise.action";
import axios from "axios";
import store from "../store";
import log from "../logger/log";

const baseUrl =
  environment.crudUrls.baseProtocol +
  "://" +
  environment.crudUrls.baseHost +
  ":" +
  environment.crudUrls.basePort +
  environment.crudUrls.prefix;

export default (hocName, hocTarget) => {
  const crudUrls = {
    create: baseUrl + environment.crudUrls[hocName.toLowerCase()].create.url,
    retrieve:
      baseUrl + environment.crudUrls[hocName.toLowerCase()].retrieve.url,
    pagination:
      baseUrl + environment.crudUrls[hocName.toLowerCase()].pagination.url,
    update: baseUrl + environment.crudUrls[hocName.toLowerCase()].update.url,
    delete: baseUrl + environment.crudUrls[hocName.toLowerCase()].delete.url
  };

  const params = {
    create: environment.crudUrls[hocName.toLowerCase()].create.param,
    retrieve: environment.crudUrls[hocName.toLowerCase()].retrieve.param,
    pagination: environment.crudUrls[hocName.toLowerCase()].pagination.param,
    update: environment.crudUrls[hocName.toLowerCase()].update.param,
    delete: environment.crudUrls[hocName.toLowerCase()].delete.param
  };

  return class loc {
    constructor() {
      this.target = hocTarget;
    }

    create(obj) {
      const promise = axios({
        method: "POST",
        url: crudUrls.create,
        data: obj
      })
        .then(response => {
          log.trace(response);
          return new Promise((resolve, reject) => {
            if (Array.isArray(response.data)) resolve([...response.data]);
            else resolve([response.data]);
          });
        })
        .catch(response => {
          log.error(response);
          return new Promise((resolve, reject) => {
            reject(response);
          });
        });

      const promiseAction = new PromiseAction(
        this.target,
        Task.CREATE,
        promise
      );

      store.dispatch(promiseAction.thunk.bind(promiseAction));
    }

    retrieve(sortField, sortOrder, currentPage, pageSize) {
      log.trace(
        "retrieve(sortField, sortOrder, currentPage, pageSize)",
        sortField,
        sortOrder,
        currentPage,
        pageSize
      );
      const promise = axios({
        method: "GET",
        url: crudUrls.pagination,
        params: {
          sortField: sortField,
          sortOrder: sortOrder,
          currentPage: currentPage,
          pageSize: pageSize
        }
      })
        .then(response => {
          return new Promise((resolve, reject) => {
            log.trace(response);
            if (Array.isArray(response.data)) {
              let paging = response.data.pop();
              resolve({ data: [...response.data], paging: paging.__paging });
            } else {
              resolve({ data: response.data });
            }
          });
        })
        .catch(response => {
          log.error(response);
          return new Promise((resolve, reject) => {
            reject(response);
          });
        });

      const promiseAction = new PromiseAction(
        this.target,
        Task.RETRIEVE,
        promise
      );

      store.dispatch(promiseAction.thunk.bind(promiseAction));
    }

    update(obj) {
      log.trace("update (obj)", obj);
      let url = crudUrls.update;

      for (let param of Object.keys(params.update)) {
        // :id -> obj['_id']
        url = url.replace(":" + param, obj[params.update[param]]);
      }
      const promise = axios({
        method: "PUT",
        url: url,
        data: obj
      })
        .then(response => {
          log.trace(response);
          return new Promise((resolve, reject) => {
            if (Array.isArray(response.data)) resolve([...response.data]);
            else resolve([response.data]);
          });
        })
        .catch(response => {
          log.error(response);
          return new Promise((resolve, reject) => {
            reject(response);
          });
        });

      const promiseAction = new PromiseAction(
        this.target,
        Task.UPDATE,
        promise,
        obj
      );

      store.dispatch(promiseAction.thunk.bind(promiseAction));
    }

    delete(obj) {
      let url = crudUrls.delete;

      for (let param of Object.keys(params.delete)) {
        // :id -> obj['_id']
        url = url.replace(":" + param, obj[params.delete[param]]);
      }

      const promise = axios({
        method: "DELETE",
        url: url,
        data: obj
      })
        .then(response => {
          log.trace(response);
          return new Promise((resolve, reject) => {
            if (Array.isArray(response.data)) resolve([...response.data]);
            else resolve([response.data]);
          });
        })
        .catch(response => {
          log.error(response);
          return new Promise((resolve, reject) => {
            reject(response);
          });
        });

      const promiseAction = new PromiseAction(
        this.target,
        Task.DELETE,
        promise,
        obj
      );

      store.dispatch(promiseAction.thunk.bind(promiseAction));
    }
  };
};
