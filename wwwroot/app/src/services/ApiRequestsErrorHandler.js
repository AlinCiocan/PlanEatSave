const INTERNAL_SERVER_ERROR = 500;
const SERVER_IS_DOWN = 'The server is down. Please try again later';

export default class ApiRequestsErrorHandler {
    static getErrorMessage(err) {
        if (!err.status || err.status === INTERNAL_SERVER_ERROR) {
            return SERVER_IS_DOWN;
        }

        // response should come from server
        return err.response.text;
    }
}