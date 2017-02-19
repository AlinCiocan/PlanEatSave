import moment from 'moment';

const DAYS_EXPIRES_SOON = 30;
export const filterOptions = {
    ALL_ITEMS: 'ALL_ITEMS',
    EXPIRED_ITEMS: 'EXPIRED_ITEMS',
    EXPIRE_SOON_ITEMS: 'EXPIRE_SOON_ITEMS'
};

const getItemsSortedByExpiration = (pantry) => {
    return pantry.pantryItems.sort((a, b) => new Date(a.expiration).getTime() - new Date(b.expiration).getTime());
};

const createAllProductList = (items) => {
    return {
        title: `All products (${items.length})`,
        items: items,
        type: filterOptions.ALL_ITEMS
    };
};


const getExpiredItems = (items) => {
    const now = moment();
    return items.filter(item => moment(item.expiration).diff(now, 'days') < 0);
};

const createExpiredItemsList = (items) => {
    return {
        title: `Expired (${items.length})`,
        items: items,
        type: filterOptions.EXPIRED_ITEMS
    };
};


const getItemsThatWillExpireSoon = (items) => {
    const now = moment();
    return items.filter(item => {
        const daysDiff = moment(item.expiration).diff(now, 'days')
        return daysDiff >= 0 && daysDiff <= DAYS_EXPIRES_SOON
    });
};

const createProductsThatWillExpireSoonList = (items) => {
    return {
        title: `To expire soon (${items.length})`,
        items: items,
        type: filterOptions.EXPIRE_SOON_ITEMS
    };
};

export class PantryService {
    static separatePantryInCategories(pantry) {
        const itemsSortedByExpiration = getItemsSortedByExpiration(pantry);
        const itemsExpired = getExpiredItems(itemsSortedByExpiration);
        const itemsThatWillExpireSoon = getItemsThatWillExpireSoon(itemsSortedByExpiration);

        return [
            createAllProductList(itemsSortedByExpiration),
            createExpiredItemsList(itemsExpired),
            createProductsThatWillExpireSoonList(itemsThatWillExpireSoon)
        ];
    }
}

