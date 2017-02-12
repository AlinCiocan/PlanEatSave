import React from 'react';
import IconButton from '../base/buttons/IconButton';
import RemoveIcon from '../base/icons/RemoveIcon';

const RecipeItem = (props) => {
    return (
        <div className="recipe-item">
            <div className="recipe-item__name">
                {props.recipe.name}
            </div>

            <div
                className="recipe-item__clickable-area"
                onClick={() => props.onRecipeClick(props.recipe.id)}>
            </div>

            <IconButton
                className="recipe-item__remove-button"
                onClick={(evt) => { evt.preventDefault(); props.onRemove(props.recipe.id); }}
            >
                <RemoveIcon />
            </IconButton>
        </div>
    );
};

export default RecipeItem;