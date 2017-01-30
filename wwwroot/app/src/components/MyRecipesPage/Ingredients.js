import React, { Component } from 'react';
import uuid from 'uuid';

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

    renderItem(ingredient) {
        return (
            <div key={ingredient.id} className="ingredients__item">
                <input
                    type="text"
                    placeholder="Add new ingredient"
                    value={ingredient.name}
                    onChange={evt => this.onIngredientValueChange(ingredient, evt.target.value)}
                    onFocus={() => this.onItemFocus(ingredient)} />
                {ingredient.canBeDeleted ? <button onClick={() => this.onItemRemove(ingredient)}> Remove </button> : null}
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
                <label>
                    Ingredients
                    </label>
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