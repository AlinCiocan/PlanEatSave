import React from 'react';
import Ingredients from './Ingredients';
import InputGroup from '../base/form/InputGroup';
import TextareaGroup from '../base/form/TextareaGroup';

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
                <TextareaGroup
                    label="Preparation"
                    value={recipe.preparation}
                    onChange={preparation => onChange({ ...recipe, preparation })}
                    placeholder="Add how the recipe is prepared"
                />
            </div>

        </div>
    );
};

export default Recipe;
