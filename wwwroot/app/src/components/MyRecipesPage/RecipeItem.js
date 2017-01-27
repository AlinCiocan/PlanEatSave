import React from 'react';

const RecipeItem = (props) => {
    return (
        <div className="recipe-item">
            <div className="recipe-item__name">
                {props.recipe.name}
            </div>
        </div>
    );
};

export default RecipeItem;