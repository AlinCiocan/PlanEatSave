import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

export default class DateFormatter {
    static getUserLocale() {
        return window.navigator.userLanguage || window.navigator.language;
    }

    static dateToIsoString(date) {
        return date.toISOString();
    }

    static stringToDate(dateAsString) {
        return moment(dateAsString, dateFormat);
    }

    static dateToString(date) {
        return date.format(dateFormat);
    }

    static getLocaleStartOfWeek(localDate) {
        return localDate.clone().startOf('day').weekday(0);
    }

    static getLocaleEndOfWeek(localDate) {
        return localDate.clone().startOf('day').weekday(6);
    }

    static extractLocaleStartAndEndOfWeek(localDate) {
        const startOfWeek = DateFormatter.getLocaleStartOfWeek(localDate);
        const endOfWeek = DateFormatter.getLocaleEndOfWeek(localDate);
        return { startOfWeek, endOfWeek };
    }

    static getDayNameFromString(dateAsString) {
        const date = DateFormatter.stringToDate(dateAsString);
        return DateFormatter.getDayName(date);
    }

    static getDayName(date) {
        return date.format('dddd');
    }

    static markLocaleDateAsUtc(localeDate) {
        const utcDate = moment.utc([
            localeDate.year(),
            localeDate.month(),
            localeDate.date(),
            localeDate.hours(),
            localeDate.minutes(),
            localeDate.seconds()
        ]);

        return utcDate;
    }

    static getLocalCurrentDate() {
        const locale = DateFormatter.getUserLocale();
        return moment().locale(locale).startOf('day');
    }
}