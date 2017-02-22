import React from 'react';
import { Link } from 'react-router';
import Routes from '../../services/Routes';

const NavigationMenu = () => {
    return (
        <div className="pes-navigation-menu">
            <Link className="pes-navigation-menu__item pes-navigation-menu__item--active" to={Routes.mealPlanner()}>
                <div className="pes-navigation-menu__item-icon"></div>
                <div className="pes-navigation-menu__item-text">
                    Meal planner
                </div>
            </Link>
            <div className="pes-navigation-menu__item-divider"></div>    
            <Link className="pes-navigation-menu__item" to={Routes.myRecipes()}>
                <div className="pes-navigation-menu__item-icon"></div>
                <div className="pes-navigation-menu__item-text">
                    Recipes
                </div>
            </Link>
            <div className="pes-navigation-menu__item-divider"></div>    
            <Link className="pes-navigation-menu__item" to={Routes.myPantry()}>
                <div className="pes-navigation-menu__item-icon"></div>
                <div className="pes-navigation-menu__item-text">
                    Pantry
                </div>
            </Link>
        </div>
    );
};

export default NavigationMenu;