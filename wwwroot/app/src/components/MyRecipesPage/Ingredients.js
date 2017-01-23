import React, { Component } from 'react';
import uuid from 'uuid';

export default class Ingredients extends Component {

    constructor(props) {
        super(props);

        const ingredients = this.props.ingredients;
        if(ingredients.every(ingredient => ingredient.canBeDeleted)) {
            ingredients.push(this.createEmptyIngredient());
        }
    
        this.state = {
            ingredients
        };
    }

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

        const ingredients = this.state.ingredients.map(ingredient => ingredient === ingredientOnFocus ? { ...ingredientOnFocus, canBeDeleted: true } : ingredient);
        const newIngredients = [...ingredients, this.createEmptyIngredient()];
        this.setState({ ingredients: newIngredients });
    }

    onItemRemove(ingredientToRemove) {
        const ingredients = this.state.ingredients.filter(ingredient => ingredient !== ingredientToRemove);
        this.setState({ ingredients });
    }

    renderItem(ingredient) {
        return (
            <div key={ingredient.id} className="ingredients__item">
                <input type="text" placeholder="Add new ingredient" defaultValue={ingredient.name} onFocus={() => this.onItemFocus(ingredient)} />
                {ingredient.canBeDeleted ? <button onClick={() => this.onItemRemove(ingredient)}> Remove </button> : null}
            </div>
        );
    }

    renderItems() {
        return this.state.ingredients.map(ingredient => {
            return this.renderItem(ingredient);
        });
    }

    render() {
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