export default class TokenStore {
    static storeTokenFromApi(tokenFromApi) {
        var token = JSON.parse(tokenFromApi);
        if (token && token.access_token) {
            window.localStorage.setItem('access_token', token.access_token);
        }
    }

    static getAuthToken() {
        return window.localStorage.getItem('access_token');
    }
}