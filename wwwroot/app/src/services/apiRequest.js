import request from 'superagent';
import TokenStore from './TokenStore';
import { config } from '../config';

export function apiUrl(path) {
    return config.API_BASE_ADDRESS + path;
}

function postRequest(url) {
    return request
        .post(apiUrl(url))
        .set('Content-Type', 'application/json');
}

function getRequest(url) {
    return request
        .get(apiUrl(url))
        .set('Content-Type', 'application/json');
}

function putRequest(url) {
    return request
        .put(apiUrl(url))
        .set('Content-Type', 'application/json');
}

function authGetRequest(url) {
    var token = TokenStore.getAuthToken();

    return getRequest(url)
        .set('Authorization', `Bearer ${token}`);
}

function authPostRequest(url) {
    var token = TokenStore.getAuthToken();

    return postRequest(url)
        .set('Authorization', `Bearer ${token}`);
}

function authPutRequest(url) {
    var token = TokenStore.getAuthToken();

    return putRequest(url)
        .set('Authorization', `Bearer ${token}`);
}


export class ApiRequest {
    static createNewAccount(user) {
        return postRequest('account/register')
            .send(user);
    }

    static login(user) {
        return postRequest('account/login')
            .send(user);
    }

    static getPantry() {
        return authGetRequest('pantry/getpantry');
    }

    static addPantryItem(item) {
        return authPostRequest('pantry/addItem')
            .send(item);
    }

    static retrievePantryItemById(itemId) {
        return authGetRequest(`pantry/getItemById?id=${itemId}`);
    }

    static updatePantryItem(item) {
        return authPutRequest('pantry/updateItem')
            .send(item);
    }
}