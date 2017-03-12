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

    static getStartOfWeek(date) {
        return date.clone().startOf('week').isoWeekday(1);
    }

    static getEndOfWeek(date) {
        return date.clone().startOf('week').isoWeekday(7);
    }

    static extractStartAndEndOfWeek(date) {
        const startOfWeek = DateFormatter.getStartOfWeek(date);
        const endOfWeek = DateFormatter.getEndOfWeek(date);
        return { startOfWeek, endOfWeek };
    }
}