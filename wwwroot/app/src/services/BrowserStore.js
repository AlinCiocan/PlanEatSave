const ACCESS_TOKEN = 'access_token';
const USER_INFO = 'user_info';

export default class BrowserStore {
    static storeTokenFromApi(tokenFromApi) {
        var token = JSON.parse(tokenFromApi);
        if (token && token.access_token) {
            localStorage.setItem(ACCESS_TOKEN, token.access_token);
        }
    }

    static getAuthToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    static isUserLoggedIn() {
        return BrowserStore.getAuthToken() ? true : false;
    }

    static logOut() {
        localStorage.clear();
    }

    static storeUserInfo(userInfo) {
        localStorage.setItem(USER_INFO, userInfo);
    }

    static getUserInfo() {
        return JSON.parse(localStorage.getItem(USER_INFO));
    }
}