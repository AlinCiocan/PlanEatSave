import React from 'react';

const RecipeItem = (props) => {
    return (
        <div className="recipe-item">
            {props.recipe.name}
        </div>
    );
};

export default RecipeItem;