import React from 'react';
import Ingredients from './Ingredients';
import InputGroup from '../base/form/InputGroup';

const Recipe = (props) => {
    const {recipe, onChange} = props;

    return (
        <div className="my-recipe">

            <InputGroup
                label="Recipe name"
                value={recipe.name}
                onChange={name => onChange({ ...recipe, name })}
                placeholder="Add name"
            />

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
