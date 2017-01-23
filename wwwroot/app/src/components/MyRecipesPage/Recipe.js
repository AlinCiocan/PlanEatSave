import React from 'react';
import Ingredients from './Ingredients';


const Recipe = (props) => {
    const {recipe, onChange} = props;

    return (
        <div className="my-recipe">
            <div className="my-recipe__recipe-name">
                <label className="my-recipe__recipe-name-label">
                    Recipe name

                        <input
                        value={recipe.name}
                        onChange={evt => onChange({ ...recipe, name: evt.target.value })}
                        className="my-recipe__recipe-name-input"
                        type="text"
                        placeholder="Add name" />
                </label>

            </div>


            <Ingredients
                className="my-recipe__ingredients"
                onChange={newIngredients => onChange({ ...recipe, ingredients: newIngredients })}
                ingredients={recipe.ingredients} />

            <div className="my-recipe__preparation">
                <label>
                    Preparation

                        <textarea
                        value={recipe.preparation}
                        onChange={evt => onChange({ ...recipe, preparation: evt.target.value })}
                        className="my-recipe__preparation-textarea"
                        placeholder="Add how the recipe is prepared">
                    </textarea>
                </label>
            </div>

        </div>
    );
};

export default Recipe;
