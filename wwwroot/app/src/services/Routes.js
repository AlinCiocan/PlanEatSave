export default class Routes {
    static base() {
        return '/';
    }

    static login() {
        return `${Routes.base()}login`;
    }

    static register() {
        return `${Routes.base()}register`;
    }

    static myPantry() {
        return `${Routes.base()}pantry`;
    }

    static addPantryItem(pantryId) {
        return `${Routes.myPantry()}/${pantryId}/add-item`;
    }

    static editPantryItem(pantryId, itemId) {
        return `${Routes.myPantry()}/${pantryId}/edit-item/${itemId}`;
    }

    static myRecipes() {
        return `${Routes.base()}my-recipes`;
    }

    static addMyRecipe() {
        return `${Routes.myRecipes()}/add-recipe`;
    }

    static editMyRecipe(recipeId) {
        return `${Routes.myRecipes()}/edit-recipe/${recipeId}`;
    }

    static viewRecipe(recipeId) {
        return `${Routes.myRecipes()}/recipe/${recipeId}`;
    }

    static mealPlanner() {
        return `${Routes.base()}meal-planner`;
    }

    static mealPlannerWithDate(date) {
        return `${Routes.mealPlanner()}?date=${date}`;
    }

    static addMeal(mealDate, mealOrder) {
        return `${Routes.base()}meal-planner/add-meal?mealDate=${mealDate}&mealOrder=${mealOrder}`;
    }
}