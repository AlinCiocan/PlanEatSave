import request from 'superagent';

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

export class ApiRequest {
    static createNewAccount(user) {
        return postRequest('account/register')
            .send(user);
    }

    static login(user) {
        return postRequest('account/login')
            .send(user);
    }
}