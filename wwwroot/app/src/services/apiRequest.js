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
var i = 0;
function newItem(name, exp) {
    i++;
    return { name, expiration: 'Exp: ' + exp , id: i};
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
        return {
            pantry: {
                lists: [{
                    id: 'pantry-list-1',
                    title: 'All products (59)',
                    items: [
                        newItem('Quinoa', '09.09.2016'),
                        newItem('Organic Coconut Milk', '29.10.2016'),
                        newItem('Vanilla Beans', '09.12.2016'),
                        newItem('Cardamom', '08.01.2017'),

                        newItem('Quinoa 2', '09.09.2018'),
                        newItem('Organic Coconut Milk 2', '29.10.2018'),
                        newItem('Vanilla Beans 2', '09.12.2018'),
                        newItem('Cardamom 2', '08.01.2018')
                    ]
                }]
            }
        }
    }
}