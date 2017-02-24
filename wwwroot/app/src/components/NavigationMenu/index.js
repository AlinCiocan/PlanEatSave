import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Routes from '../../services/Routes';
import pages from '../../constants/pages';

const NavigationMenu = (props) => {
    debugger;
    return (
        <div className="pes-navigation-menu">
            
            <Link className={classNames('pes-navigation-menu__item', {'pes-navigation-menu__item--active': props.activeItem === pages.PLANNER})} to={Routes.mealPlanner()}>
                <div className="pes-navigation-menu__item-icon"></div>
                <div className="pes-navigation-menu__item-text">
                    Meal planner
                </div>
            </Link>
            
            <div className="pes-navigation-menu__item-divider"></div>    
            <Link className={classNames('pes-navigation-menu__item', {'pes-navigation-menu__item--active': props.activeItem === pages.RECIPES})} to={Routes.myRecipes()}>
                <div className="pes-navigation-menu__item-icon"></div>
                <div className="pes-navigation-menu__item-text">
                    Recipes
                </div>
            </Link>
            <div className="pes-navigation-menu__item-divider"></div>    
            <Link className={classNames('pes-navigation-menu__item', {'pes-navigation-menu__item--active': props.activeItem === pages.PANTRY})} to={Routes.myPantry()}>
                <div className="pes-navigation-menu__item-icon"></div>
                <div className="pes-navigation-menu__item-text">
                    Pantry
                </div>
            </Link>
        </div>
    );
};

export default NavigationMenu;