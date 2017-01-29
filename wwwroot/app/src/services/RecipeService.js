import uuid from 'uuid';

export default class RecipeService {
    static addUniqueIdsForIngredients(ingredients) {
        return ingredients.map(ingredient => ({id: uuid.v4(), name: ingredient }));
    }

    static processRecipe(recipe) {
        return { ...recipe, ingredients: RecipeService.addUniqueIdsForIngredients(recipe.ingredients) };
    }

    static processRecipes(recipes) {
        return recipes.map(recipe => RecipeService.processRecipe(recipe));
    }
}
