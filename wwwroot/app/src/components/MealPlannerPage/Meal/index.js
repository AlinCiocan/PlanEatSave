import React from 'react';
import Routes from '../../../services/Routes';
import Link from '../../base/Link';
import RemoveIcon from '../../base/icons/RemoveIcon';

const Meal = ({ meal, onRemoveMeal }) => (
    <div className="pes-meal">
        <div className="pes-meal__divider"></div>

        <Link
            undecorated
            to={Routes.viewRecipe(meal.recipeId)}
            className="pes-meal__recipe-name">
            {meal.recipeName}
        </Link>

        <button
            onClick={() => onRemoveMeal(meal.id, meal.recipeName)}
            className="pes-meal__remove-button">
            <RemoveIcon />
        </button>
    </div>
);

export default Meal;