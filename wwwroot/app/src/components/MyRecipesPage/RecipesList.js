import React from 'react';
import RecipeItem from './RecipeItem';


const RecipesList = (props) => {
    return (
        <div className="recipes-list">
            <h2 className="recipes-list__title"> {props.title} ({props.recipes.length}) </h2>

            {props.recipes.map(recipe => {
                return (
                    <div key={recipe.id}> 
                        <RecipeItem recipe={recipe} />
                    </div>
                );
            })}

        </div>
    );
};

export default RecipesList;