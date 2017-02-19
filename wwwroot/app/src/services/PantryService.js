import moment from 'moment';

const DAYS_EXPIRES_SOON = 30;


const getItemsSortedByExpiration = (pantry) => {
    return pantry.pantryItems.sort((a, b) => new Date(a.expiration).getTime() - new Date(b.expiration).getTime());
};

const createAllProductList = (items) => {
    return {
        title: `All products (${items.length})`,
        items: items,
        key: 'allProducts'
    };
};

const getItemsThatWillExpireSoon = (items) => {
    const now = moment();
    return items.filter((item) => moment(item.expiration).diff(now, 'days') <= DAYS_EXPIRES_SOON);
};

const createProductsThatWillExpireSoonList = (items) => {
    return {
        title: `To expire soon (${items.length})`,
        items: items,
        key: 'willExpireSoon'
    };
};

export default class PantryService {
    static separatePantryInCategories(pantry) {
        const itemsSortedByExpiration = getItemsSortedByExpiration(pantry);
        const itemsThatWillExpireSoon = getItemsThatWillExpireSoon(itemsSortedByExpiration);

        return [
            createProductsThatWillExpireSoonList(itemsThatWillExpireSoon),
            createAllProductList(itemsSortedByExpiration)
        ];
    }
}
