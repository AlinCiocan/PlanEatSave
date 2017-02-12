import React, { Component } from 'react';
import uuid from 'uuid';
import classNames from 'classnames';
import RemoveIcon from '../base/icons/RemoveIcon';
import Label from '../base/form/Label';
import { applicationSettings, recipeSettings } from '../../constants/settings';
import IconButton from '../base/buttons/IconButton';

const ENTER_KEY = 13;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;

class Ingredients extends Component {
    createEmptyIngredient() {
        return {
            name: '',
            id: uuid.v4(),
            canBeDeleted: false
        };
    }

    onItemFocus(ingredientOnFocus) {
        if (ingredientOnFocus.canBeDeleted) {
            return;
        }

        if (this.ingredients.length >= recipeSettings.MAX_NUMBER_OF_INGREDIENTS) {
            return;
        }

        const ingredients = this.ingredients.map(ingredient => ingredient === ingredientOnFocus ? { ...ingredientOnFocus, canBeDeleted: true } : ingredient);
        this.props.onChange([...ingredients, this.createEmptyIngredient()]);
    }

    onItemRemove(ingredientToRemove) {
        const ingredients = this.ingredients.filter(ingredient => ingredient !== ingredientToRemove);
        this.props.onChange(ingredients);
    }

    onIngredientValueChange(ingredient, newValue) {
        const ingredients = this.ingredients.map(x => x === ingredient ? { ...ingredient, name: newValue } : x);
        this.props.onChange(ingredients);
    }

    doFocusOnIngredient(ingredient) {
        const ingredientDomElement = this.refs[ingredient.id];

        // hack in order to move the cursor of the input always at the end
        ingredientDomElement.value = '';
        ingredientDomElement.value = ingredient.name;
        ingredientDomElement.focus();
    }

    doFocusOnNextIngredient(ingredient) {
        const nextIngredientIndex = this.ingredients.indexOf(ingredient) + 1;
        if (nextIngredientIndex >= this.ingredients.length) {
            return;
        }

        this.doFocusOnIngredient(this.ingredients[nextIngredientIndex]);
    }

    doFocusOnPreviousIngredient(ingredient) {
        const previousIngredientIndex = this.ingredients.indexOf(ingredient) - 1;
        if (previousIngredientIndex < 0) {
            return;
        }

        this.doFocusOnIngredient(this.ingredients[previousIngredientIndex]);
    }

    onIngredientKeyDown(evt, ingredient) {
        if (evt.keyCode === ENTER_KEY || evt.keyCode === DOWN_ARROW_KEY) {
            this.doFocusOnNextIngredient(ingredient);
            return;
        }

        if (evt.keyCode === UP_ARROW_KEY) {
            evt.preventDefault();
            this.doFocusOnPreviousIngredient(ingredient);
        }
    }

    renderRemoveButton(ingredient) {
        const cannotBeDeleted = !ingredient.canBeDeleted;
        const buttonClasses = classNames({
            "ingredients__remove-button--not-visible": cannotBeDeleted
        });

        return (
            <IconButton
                className={buttonClasses}
                onClick={() => this.onItemRemove(ingredient)}
            >
                <RemoveIcon />
            </IconButton>
        );
    }

    renderItem(ingredient) {
        return (
            <div key={ingredient.id} className="ingredients__item">
                <input
                    className="ingredients__item-input"
                    type="text"
                    placeholder="Add new ingredient"
                    maxLength={applicationSettings.MAX_LENGTH_INPUT}
                    value={ingredient.name}
                    onChange={evt => this.onIngredientValueChange(ingredient, evt.target.value)}
                    onFocus={() => this.onItemFocus(ingredient)}
                    ref={ingredient.id}
                    onKeyDown={evt => this.onIngredientKeyDown(evt, ingredient)} />
                {this.renderRemoveButton(ingredient)}
            </div>
        );
    }

    renderItems() {
        return this.ingredients.map(ingredient => {
            return this.renderItem(ingredient);
        });
    }

    render() {
        // TODO: refactor this (Ingredients should be split in IngredientsList and IngredientItem)
        const ingredients = [...this.props.ingredients];
        if (ingredients.every(ingredient => ingredient.canBeDeleted)) {
            ingredients.push(this.createEmptyIngredient());
        }
        this.ingredients = ingredients;

        return (
            <div className={this.props.className}>
                <Label text="Ingredients" />
                <div className="ingredients__list">
                    {this.renderItems()}
                </div>
            </div>
        );
    }

}

Ingredients.propTypes = {
    ingredients: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        canBeDeleted: React.PropTypes.bool.isRequired
    })).isRequired
};

export default Ingredients;