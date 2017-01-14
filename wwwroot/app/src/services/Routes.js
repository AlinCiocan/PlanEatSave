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

    static addMyRecipe(myRecipesId) {
        return `${Routes.myRecipes()}/${myRecipesId}/add-recipe`;
    }

    static editMyRecipe(myRecipesId, recipeId) {
        return `${Routes.myRecipes()}/${myRecipesId}/edit-recipe/${recipeId}`;
    }
}