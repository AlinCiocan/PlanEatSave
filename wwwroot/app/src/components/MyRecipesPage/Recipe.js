import React, { Component } from 'react';
import moment from 'moment';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import Ingredients from './Ingredients';

export default class Recipe extends Component {

    render() {
        return (
            <div className="my-recipe">
                <div className="my-recipe__recipe-name">
                    <label className="my-recipe__recipe-name-label">
                        Recipe name

                        <input className="my-recipe__recipe-name-input" type="text" placeholder="Add name" />
                    </label>

                </div>


                <Ingredients className="my-recipe__ingredients" ingredients={[{name: 'porto'}, {name: 'caramel 2'}]} />

                <div className="my-recipe__preparation">
                    <label>
                        Preparation


                        <textarea className="my-recipe__preparation-textarea" placeholder="Add how the recipe is prepared"></textarea>
                    </label>
                </div>

            </div>
        );
    }
}
