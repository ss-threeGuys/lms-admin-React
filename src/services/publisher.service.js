import { Target, Task } from "../store/reducers";
import { environment } from 'src/environments/environment';
import axios from 'axios';

const crudUrls = {
    create:     'http://'+environment.crudUrls.baseHost+':'
                    + environment.crudUrls.basePort
                    + environment.crudUrls.prefix 
                    + environment.crudUrls.publisher.create.url,
    retrieve:   'http://'+environment.crudUrls.baseHost+':'
                    + environment.crudUrls.basePort
                    + environment.crudUrls.prefix 
                    + environment.crudUrls.publisher.retrieve.url,
    pagination: 'http://'+environment.crudUrls.baseHost+':'
                    + environment.crudUrls.basePort
                    + environment.crudUrls.prefix 
                    + environment.crudUrls.publisher.pagination.url,
    update:     'http://'+environment.crudUrls.baseHost+':'
                    + environment.crudUrls.basePort
                    + environment.crudUrls.prefix 
                    + environment.crudUrls.publisher.update.url,
    delete:     'http://'+environment.crudUrls.baseHost+':'
                    + environment.crudUrls.basePort
                    + environment.crudUrls.prefix 
                    + environment.crudUrls.publisher.delete.url,
};


const params = {
    create: environment.crudUrls.publisher.create.param,
    retrieve: environment.crudUrls.publisher.retrieve.param,
    pagination: environment.crudUrls.publisher.pagination.param,
    update: environment.crudUrls.publisher.update.param,
    delete: environment.crudUrls.publisher.delete.param,
}

export class PublisherService {

    constructor() {
        this.target = Target.PUBLISHER;
    }

    create(publisher) {

        const promise = axios({
            method: 'POST',
            url: crudUrls.create,
            data: publisher
          })
        .then(
            (response) => {
                //console.log(response.data);
                return new Promise(
                    (resolve,reject) =>{
                        if (Array.isArray(response.data))
                            resolve([...response.data]);
                        else
                            resolve([response.data]);
                });
        })
        .catch(
            (response) => {
                return new Promise(
                    (resolve,reject) =>{
                        reject(response);
                });
        });

        const promiseAction = new PromiseAction(this.target, Task.RETRIEVE, promise);

        promiseAction.start();

    }

    retrieve(sortField, sortOrder, currentPage, pageSize) {

        const promise = axios({
            method: 'GET',
            url: crudUrls.pagination,
            params: {
                sortField: sortField,
                sortOrder: sortOrder,
                currentPage: currentPage,
                pageSize: pageSize
            }
          })
            .then(
                (response) => {
                    return new Promise(
                        (resolve,reject) =>{
                            let paging = response.data.pop();
                            
                            if (Array.isArray(response.data)){
                                resolve([...response.data, paging]);
                            }
                            else {
                                resolve([response.data, paging]);
                            }
                    });
            })
            .catch(
                (response) => {
                    return new Promise(
                        (resolve,reject) =>{
                            reject(response);
                    });
            });

        const promiseAction = new PromiseAction(this.target, Task.RETRIEVE, promise);

        promiseAction.start();

    }

    update (publisher) {

        let url = crudUrls.update;

        for(let param of Object.keys(params.update)) {
            // :id -> publisher['_id']
            url = url.replace(':'+param, publisher[params.update[param]]);
        }
        const promise = axios({
            method: 'PUT',
            url: url,
            data: publisher
          })
        .then(
            (response) => {
                //console.log(response.data);
                return new Promise(
                    (resolve,reject) =>{
                        if (Array.isArray(response.data))
                            resolve([...response.data]);
                        else
                            resolve([response.data]);
                });
        })
        .catch(
            (response) => {
                return new Promise(
                    (resolve,reject) =>{
                        reject(response);
                });
        });


        const promiseAction = new PromiseAction(this.target, Task.UPDATE, promise, publisher);

        promiseAction.start();


    }

    delete (publisher) {
        let url = crudUrls.delete;

        for(let param of Object.keys(params.delete)) {
            // :id -> publisher['_id']
            url = url.replace(':'+param, publisher[params.delete[param]]);
        }
    
        const promise = axios({
            method: 'DELETE',
            url: url,
            data: publisher
          })
        .then(
            (response) => {
                //console.log(response.data);
                return new Promise(
                    (resolve,reject) =>{
                        if (Array.isArray(response.data))
                            resolve([...response.data]);
                        else
                            resolve([response.data]);
                });
        })
        .catch(
            (response) => {
                return new Promise(
                    (resolve,reject) =>{
                        reject(response);
                });
        });


        const promiseAction = new PromiseAction(this.target, Task.DELETE, promise, publisher);

        promiseAction.start();


    }
}