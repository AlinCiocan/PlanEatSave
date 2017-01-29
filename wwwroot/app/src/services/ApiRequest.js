import request from 'superagent';
import BrowserStore from './BrowserStore';
import { config } from '../config';

export function apiUrl(path) {
    return config.API_BASE_ADDRESS + path;
}

function getRequest(url) {
    return request
        .get(apiUrl(url))
        .set('Content-Type', 'application/json');
}

function postRequest(url) {
    return request
        .post(apiUrl(url))
        .set('Content-Type', 'application/json');
}

function putRequest(url) {
    return request
        .put(apiUrl(url))
        .set('Content-Type', 'application/json');
}

function deleteRequest(url) {
    return request
        .del(apiUrl(url))
        .set('Content-Type', 'application/json');
}

function authGetRequest(url) {
    var token = BrowserStore.getAuthToken();

    return getRequest(url)
        .set('Authorization', `Bearer ${token}`);
}

function authPostRequest(url) {
    var token = BrowserStore.getAuthToken();

    return postRequest(url)
        .set('Authorization', `Bearer ${token}`);
}

function authPutRequest(url) {
    var token = BrowserStore.getAuthToken();

    return putRequest(url)
        .set('Authorization', `Bearer ${token}`);
}

function authDeleteRequest(url) {
    var token = BrowserStore.getAuthToken();

    return deleteRequest(url)
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

    static getUserInfo() {
        return authGetRequest('account/userInfo');
    }

    static getPantry() {
        return authGetRequest('pantry/getPantry');
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

    static removePantryItem(itemId) {
        return authDeleteRequest(`pantry/removeItem?id=${itemId}`);
    }

    static saveRecipe(recipe) {
        return authPostRequest('recipes/addRecipe')
            .send(recipe);
    }

    static retrieveRecipes() {
        return authGetRequest('recipes/retrieveAll');
    }

    static retrieveRecipe(recipeId) {
        return authGetRequest(`recipes/getRecipeById?id=${recipeId}`);
    }

    static editRecipe(recipe) {
        return authPutRequest('recipes/editRecipe')
            .send(recipe);
    }
}
