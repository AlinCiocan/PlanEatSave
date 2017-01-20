import React, { Component } from 'react';
import uuid from 'uuid';

export default class Ingredients extends Component {

    constructor(props) {
        super(props);

        const ingredientsWithKeys = this.props.ingredients.map(ingredient => {
            ingredient.key = uuid.v4();
            ingredient.isRemoveVisible = true;
            return ingredient;
        });

        this.state = {
            ingredients: [...ingredientsWithKeys, this.createEmptyIngredient()]
        };
    }

    getIngredients() {
        return this.state.map(ingredient => ({ name: ingredient.name }));
    }

    createEmptyIngredient() {
        return {
            name: '',
            isRemoveVisible: false,
            key: uuid.v4()
        };
    }

    onItemFocus(ingredientOnFocus) {
        if (ingredientOnFocus.isRemoveVisible) {
            return;
        }

        const ingredients = this.state.ingredients.map(ingredient => ingredient === ingredientOnFocus ? { ...ingredientOnFocus, isRemoveVisible: true } : ingredient);
        const newIngredients = [...ingredients, this.createEmptyIngredient()];
        this.setState({ ingredients: newIngredients });
    }

    onItemRemove(ingredientToRemove) {
        const ingredients = this.state.ingredients.filter(ingredient => ingredient !== ingredientToRemove);
        this.setState({ ingredients });
    }

    renderItem(ingredient) {
        return (
            <div key={ingredient.key} className="ingredients__item">
                <input type="text" placeholder="Add new ingredient" defaultValue={ingredient.name} onFocus={() => this.onItemFocus(ingredient)} />
                {ingredient.isRemoveVisible ? <button onClick={() => this.onItemRemove(ingredient)}> Remove </button> : null}
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