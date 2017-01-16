import React, { Component } from 'react';

export default class Ingredients extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <label>
                    Ingredients
                    </label>
                <div className="my-recipe__ingredients-list">
                    <input type="text" placeholder="Add new ingredient" />
                </div>
            </div>
        );
    }

}