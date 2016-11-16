const ACCESS_TOKEN = 'access_token';

export default class TokenStore {
    static storeTokenFromApi(tokenFromApi) {
        var token = JSON.parse(tokenFromApi);
        if (token && token.access_token) {
            window.localStorage.setItem(ACCESS_TOKEN, token.access_token);
        }
    }

    static getAuthToken() {
        return window.localStorage.getItem(ACCESS_TOKEN);
    }

    static isUserLoggedIn() {
        return TokenStore.getAuthToken() ? true : false;
    }

    static logOut() {
        window.localStorage.removeItem(ACCESS_TOKEN);
    }
}