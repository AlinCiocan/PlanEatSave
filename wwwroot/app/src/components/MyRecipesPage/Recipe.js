import React, { Component } from 'react';
import moment from 'moment';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';

export default class Recipe extends Component {

    render() {
        return (
            <div className="my-recipe">
                <label>
                    Recipe name
                </label>

                <input type="text" placeholder="Add name" />


                <div className="my-recipe__ingredients">
                    <label>
                        Ingredients
                    </label>
                    <input type="text" placeholder="Add new ingredient" />
                </div>


                <div className="my-recipe__preparation">
                    <label>
                        Preparation
                    </label>


                    <textarea placeholder="Add">

                    </textarea>
                </div>




            </div>
        );
    }
}
