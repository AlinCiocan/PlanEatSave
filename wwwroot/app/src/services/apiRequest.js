import request from 'superagent';
import TokenStore from './TokenStore';
// TODO: make sure to put this url in a config file
export const API_BASE_ADDRESS = 'http://localhost:5000/api/';

export function apiUrl(path) {
    return API_BASE_ADDRESS + path;
}

function postRequest(url) {
    return request
        .post(apiUrl(url))
        .set('Content-Type', 'application/json');
}

function getRequest(url) {
    return request
        .get(apiUrl(url))
        .set('Content-Type', 'application/json')
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
}