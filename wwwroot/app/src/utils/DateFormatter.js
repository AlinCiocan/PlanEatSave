import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

export default class DateFormatter {
    static dateToIsoString(date) {
        return date.toISOString();
    }

    static stringToDate(dateAsString) {
        return moment.utc(dateAsString, dateFormat);
    }

    static dateToString(date) {
        return date.format(dateFormat);
    }
}