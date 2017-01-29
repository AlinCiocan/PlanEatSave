import React from 'react';

const ViewRecipe = (props) => {
    const { recipe } = props;

    return (
        <div className="view-recipe">
            <h2 className="view-recipe__title"> {recipe.name} </h2>
            <div className="view-recipe__img-container">
            </div>

            <div className="view-recipe__ingredients">
                <h3 className="view-recipe__ingredients-title"> Ingredients </h3>
                <ul className="view-recipe__ingredients-list">
                    {recipe.ingredients.map(ingredient => (
                        <li key={ingredient.id} className="view-recipe__ingredients-item"> {ingredient.name} </li>
                    ))}
                </ul>
            </div>

            <div className="view-recipe__preparation">
                <h3 className="view-recipe__preparation-title"> Preparation </h3>
                <pre className="view-recipe__preparation-description">
                    {recipe.preparation}
                </pre>
            </div>

        </div>
    );
};

export default ViewRecipe;
